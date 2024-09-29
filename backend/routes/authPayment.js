const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const puppeteer = require("puppeteer");
require("dotenv/config");
const moment = require("moment");
const generate = require("nanoid-generate");
const generateInvoice = generate.numbers(6);
const generateCaseId = generate.numbers(3);
const rapid = require("eway-rapid");

const apiKey = process.env.API_KEY,
  password = process.env.API_PASSWORD,
  rapidEndpoint = "Production"; // Use 'Production' when you go live

// Imports
const Listing = require("../models/listingModel");
const Payment = require("../models/paymentModel");
const Pub = require("../models/applicationModel");
const User = require("../models/userModel");
const Locum = require("../models/locumModel");

// Save to AWS
const { uploadInvoice } = require("../../s3");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const {
  paymentConfirmation,
  sendEmail,
  pdfContent,
  toLocum,
  pdfContract,
  sendHiredEmail,
} = require("../emails/sendEmail");

router.get("/check", async (req, res) => {
  var client = rapid.createClient(apiKey, password, rapidEndpoint);

  client
    .queryTransaction(req.query.accessCode)
    .then(function (response) {
      console.log(response.get("Transactions[0]"));
      if (response.get("Transactions[0].TransactionStatus")) {
        console.log(
          "Payment successful! ID: " +
            response.get("Transactions[0].TransactionID")
        );
        res.json({
          response,
        });
      } else {
        var errorCodes = response
          .get("Transactions[0].ResponseMessage")
          .split(", ");
        errorCodes.forEach(function (errorCode) {
          console.log("Response Message: " + rapid.getMessage(errorCode, "en"));
          res.json({
            response,
          });
        });
      }
    })
    .catch(function (reason) {
      reason.getErrors().forEach(function (error) {
        console.log("Response Messages: " + rapid.getMessage(error, "en"));
      });
    });
});

// ====== PAYMENT REGISTER (from CreditCard.js) =====
router.post("/nopayment", async (req, res) => {
  const candidate = await Pub.findOne({ nanoslug: req.body.nanoslug });

  const post = await Listing.findOne({ slug: candidate.slugId });

  const total = 0;
  const gst = (total - total / 1.1).toFixed(2);
  const fee = (total / 1.1).toFixed(2);

  // Generate local timeone for MongoDB
  let dt = new Date();
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  const payment = new Payment({
    isPaidLocum: req.body.isPaidLocum,
    invoiceNumber: "INV" + generateInvoice + post.state,
    totalAmount: total.toFixed(2),
    gst: gst,
    dateIssued: moment().format("DD MMM YYYY"),
    createdAt: dt,
    // Employer
    firstName: post.firstName,
    lastName: post.lastName,
    email: post.email,
    phone: post.phone,
    contractType: post.contractType,
    professions: post.professions,
    caseId: post.caseId,
    streetNo: post.streetNo,
    street: post.street,
    suburb: post.suburb,
    postalCode: post.postalCode,
    state: post.state,
    country: post.country,
    latitude: post.latitude,
    longitude: post.longitude,
    // Job Seeker
    jobSeekerFirstName: candidate.firstName,
    jobSeekerLastName: candidate.lastName,
    jobSeekerEmail: candidate.email,
  });

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const mc = "https://i.ibb.co/TrWvXBB/mc.png";
  const visa = "https://i.ibb.co/zSDYxhX/visa.png";
  const amex = "https://i.ibb.co/7j3gRNH/amex.png";
  const thisyear = moment().format("YYYY");
  const date = moment().format("DD MMM YYYY");
  const email = post.email;
  const phone = post.phone;
  const firstName = post.firstName;
  const lastName = post.lastName;
  const caseId = post.caseId;
  const status = "No Charge";
  const product = "Locum Service";
  const invoice = payment.invoiceNumber;
  const streetNo = post.streetNo;
  const street = post.street;
  const suburb = post.suburb;
  const postalCode = post.postalCode;
  const state = post.state;
  const country = post.country;
  const professions = post.professions;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  pdfContent(
    invoice,
    logo,
    mc,
    visa,
    amex,
    firstName,
    lastName,
    email,
    phone === undefined ? "" : phone,
    date,
    professions,
    product,
    total.toFixed(2),
    fee,
    gst,
    streetNo === undefined ? "" : streetNo,
    street === undefined ? "" : street,
    suburb === undefined ? "" : suburb,
    state === undefined ? "" : state,
    postalCode === undefined ? "" : postalCode,
    country === undefined ? "" : country,
    thisyear,
    status
  );
  await page.setContent(pdfOutput);

  await page.pdf({
    path: `./public/uploads/${invoice}.pdf`,
    format: "A4",
    printBackground: true,
  });

  paymentConfirmation(
    caseId,
    invoice,
    email,
    firstName,
    date,
    total.toFixed(2),
    thisyear,
    logo,
    product,
    status
  );

  const pathToAttachment = `./public/uploads/${invoice}.pdf`;
  const attachment = fs.readFileSync(pathToAttachment).toString("base64");

  // Save to AWS S3 Bucket
  const result = await uploadInvoice(invoice, pathToAttachment);
  await unlinkFile(pathToAttachment);

  const subject = `Payment Invoice ${invoice}`;
  const to = `${email}`;
  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  const attachments = [
    {
      content: attachment,
      filename: `${invoice}.pdf`,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];

  sendEmail(to, from, subject, output, attachments);
  await browser.close();
  // Listings => Paused
  let set = {};
  set["isPaidLocum"] = req.body.isPaidLocum;
  set["isActiveJob"] = req.body.isActiveJob;

  await Listing.updateMany({ slug: candidate.slugId }, { $set: set });

  //Application => remainder Locum rejected
  await Pub.updateMany(
    { _id: { $ne: candidate._id }, slugId: candidate.slugId },
    { isRejected: true }
  );

  // Application => Locum selected

  await Pub.findByIdAndUpdate(
    { _id: candidate._id },
    { isSelected: req.body.isSelected, expiryOffer: post.expiryDate }
  );

  // Listing.findByIdAndUpdate(post._id, req.body).then(function () {
  //   Listing.updateOne({ isPaidLocum: req.body.isPaidLocum });
  // });

  try {
    const storePayment = await payment.save();
    res.send(storePayment);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "payment_failed");
  }
});

// ====== PAYMENT REGISTER (from CreditCardLoading.js) ===
router.put("/finalise", async (req, res) => {
  const candidate = await Pub.findOne({ nanoslug: req.body.nanoslug });

  const post = await Listing.findOne({ slug: candidate.slugId });

  const total = parseFloat(req.body.totalAmount / 100);

  const gst = (total - total / 1.1).toFixed(2);

  const fee = (total / 1.1).toFixed(2);

  // Generate local timeone for MongoDB
  let dt = new Date();
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  const payment = new Payment({
    isPaidLocum: req.body.isPaidLocum,
    invoiceNumber: req.body.invoiceNumber,
    totalAmount: total.toFixed(2),
    gst: gst,
    dateIssued: moment().format("DD MMM YYYY"),
    createdAt: dt,
    // Employer
    firstName: post.firstName,
    lastName: post.lastName,
    email: post.email,
    phone: post.phone,
    contractType: post.contractType,
    professions: post.professions,
    caseId: post.caseId,
    streetNo: post.streetNo,
    street: post.street,
    suburb: post.suburb,
    postalCode: post.postalCode,
    state: post.state,
    country: post.country,
    latitude: post.latitude,
    longitude: post.longitude,
    // Job Seeker
    jobSeekerFirstName: candidate.firstName,
    jobSeekerLastName: candidate.lastName,
    jobSeekerEmail: candidate.email,
  });

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const date = moment().format("DD MMM YYYY");
  const mc = "https://i.ibb.co/TrWvXBB/mc.png";
  const visa = "https://i.ibb.co/zSDYxhX/visa.png";
  const amex = "https://i.ibb.co/7j3gRNH/amex.png";
  const firstName = post.firstName;
  const lastName = post.lastName;
  const phone = post.phone;
  const email = req.body.email;
  const invoice = req.body.invoiceNumber;
  const caseId = post.caseId;
  const status = "PAID";
  const product = "Locum Service";
  const streetNo = post.streetNo;
  const street = post.street;
  const suburb = post.suburb;
  const postalCode = post.postalCode;
  const state = post.state;
  const country = post.country;
  const professions = post.professions;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  pdfContent(
    invoice,
    logo,
    mc,
    visa,
    amex,
    firstName,
    lastName,
    email,
    phone === undefined ? "" : phone,
    date,
    professions,
    product,
    total.toFixed(2),
    fee,
    gst,
    streetNo === undefined ? "" : streetNo,
    street === undefined ? "" : street,
    suburb === undefined ? "" : suburb,
    state === undefined ? "" : state,
    postalCode === undefined ? "" : postalCode,
    country === undefined ? "" : country,
    thisyear,
    status
  );
  await page.setContent(pdfOutput);

  await page.pdf({
    path: `./public/uploads/${invoice}.pdf`,
    format: "A4",
    printBackground: true,
  });

  paymentConfirmation(
    caseId,
    invoice,
    email,
    firstName,
    date,
    total.toFixed(2),
    thisyear,
    logo,
    product,
    status
  );

  const pathToAttachment = `./public/uploads/${invoice}.pdf`;
  const attachment = fs.readFileSync(pathToAttachment).toString("base64");

  // Save to AWS S3 Bucket
  const result = await uploadInvoice(invoice, pathToAttachment);
  await unlinkFile(pathToAttachment);

  const subject = `Payment Invoice ${invoice}`;
  const to = `${email}`;
  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  const attachments = [
    {
      content: attachment,
      filename: `${invoice}.pdf`,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];

  sendEmail(to, from, subject, output, attachments);
  await browser.close();

  // Listings => Paused
  let set = {};
  set["isPaidLocum"] = req.body.isPaidLocum;
  set["isActiveJob"] = req.body.isActiveJob;

  await Listing.updateMany({ slug: candidate.slugId }, { $set: set });

  //Application => remainder Locum rejected
  await Pub.updateMany(
    { _id: { $ne: candidate._id }, slugId: candidate.slugId },
    { isRejected: true }
  );

  // Application => Locum selected

  await Pub.findByIdAndUpdate(
    { _id: candidate._id },
    { isSelected: req.body.isSelected, expiryOffer: post.expiryDate }
  );

  // Pub.findByIdAndUpdate(candidate._id, req.body).then(function () {
  //   Pub.updateOne({ isSelected: req.body.isSelected });
  // });

  try {
    const storePayment = await payment.save();
    res.send(storePayment);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "payment_failed");
  }
});

// ====== PAYMENT REGISTER (from CreditCardLoading.js) ===
router.put("/emailToLocum", async (req, res) => {
  const candidate = await Pub.findOne({ nanoslug: req.body.nanoslug });
  const locum = await Locum.findOne({ email: candidate.email });
  const post = await Listing.findOne({ slug: candidate.slugId });
  const emp = await User.findOne({ email: req.body.email });
  const dateIssued = req.query.dateIssued.split("GMT")[0];

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const jobSeekerFirstName = candidate.firstName;
  const jobSeekerLastName = candidate.lastName;
  const jobSeekerEmail = candidate.email;
  const jobSeekerPhone = candidate.phone;
  const ahpra = locum.ahpra;
  const locum_streetNo = locum.streetNo;
  const locum_street = locum.street;
  const locum_suburb = locum.suburb;
  const locum_state = locum.state;
  const locum_postalCode = locum.postalCode;
  const available_start = candidate.available_start;
  const available_finish = candidate.available_finish;
  const firstName = post.firstName;
  const lastName = post.lastName;
  const phone = post.phone;
  const email = req.body.email;
  const streetNo = post.streetNo;
  const street = post.street;
  const suburb = post.suburb;
  const postalCode = post.postalCode;
  const state = post.state;
  const country = post.country;
  const normal_rate = post.normal_rate;
  const sat_rate = post.sat_rate;
  const sun_rate = post.sun_rate;
  const ph_rate = post.ph_rate;
  const accommodation = post.accommodation;
  const roadtravel = post.roadtravel;
  const airtravel = post.airtravel;
  const airport = post.airport;
  const emp_streetNo = emp.streetNo;
  const emp_street = emp.street;
  const emp_suburb = emp.suburb;
  const emp_state = emp.state;
  const emp_postalCode = emp.postalCode;
  const professions = post.professions;
  const caseId = post.caseId;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  pdfContract(
    jobSeekerFirstName,
    jobSeekerLastName,
    jobSeekerEmail,
    jobSeekerPhone,
    ahpra,
    available_start,
    available_finish,
    locum_streetNo === undefined ? "" : locum_streetNo,
    locum_street === undefined ? "" : locum_street,
    locum_suburb === undefined ? "" : locum_suburb,
    locum_state === undefined ? "" : locum_state,
    locum_postalCode === undefined ? "" : locum_postalCode,
    firstName,
    lastName,
    email,
    phone,
    streetNo === undefined ? "" : streetNo,
    street === undefined ? "" : street,
    suburb === undefined ? "" : suburb,
    state === undefined ? "" : state,
    postalCode === undefined ? "" : postalCode,
    emp_streetNo === undefined ? "" : emp_streetNo,
    emp_street === undefined ? "" : emp_street,
    emp_suburb === undefined ? "" : emp_suburb,
    emp_state === undefined ? "" : emp_state,
    emp_postalCode === undefined ? "" : emp_postalCode,
    professions,
    caseId,
    dateIssued,
    thisyear,
    logo,
    normal_rate,
    sat_rate,
    sun_rate,
    ph_rate,
    accommodation,
    roadtravel,
    airtravel,
    airport
  );

  await page.setContent(pdfOutput);

  await page.pdf({
    path: `./public/uploads/${caseId}.pdf`,
    format: "A4",
    printBackground: true,
  });

  toLocum(
    jobSeekerFirstName,
    jobSeekerEmail,
    available_start,
    available_finish,
    firstName,
    lastName,
    //employer
    email,
    phone === undefined ? "" : phone,
    emp_streetNo === undefined ? "" : emp_streetNo,
    emp_street === undefined ? "" : emp_street,
    emp_suburb === undefined ? "" : emp_suburb,
    emp_state === undefined ? "" : emp_state,
    emp_postalCode === undefined ? "" : emp_postalCode,
    country === undefined ? "" : "Australia",
    professions,
    thisyear,
    logo,
    caseId
  );

  const pathToAttachment = `./public/uploads/${caseId}.pdf`;
  const attachment = fs.readFileSync(pathToAttachment).toString("base64");

  const subject = `Offer accepted for ${caseId}`;
  const to = `${jobSeekerEmail}`;
  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  const attachments = [
    {
      content: attachment,
      filename: `${caseId}.pdf`,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];

  sendHiredEmail(to, from, subject, output, attachments);
  await browser.close();
});






//===== SUBMIT IN CREDIT CARD (from CreditCardRegular.js) =======
router.post("/regularList", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  var totale = parseFloat(req.body.total * 100);

  var client = rapid.createClient(apiKey, password, rapidEndpoint);

  try {
    client
      .createTransaction(rapid.Enum.Method.TRANSPARENT_REDIRECT, {
        Customer: {
          FirstName: user.firstName,
          LastName: user.lastName,
          Street1: user.streetNo,
          Street2: user.street,
          City: user.suburb,
          State: user.state,
          PostalCode: user.postalCode,
          Country: "au",
          Mobile: user.phone,
          Email: user.email,
        },
        Product: [
          {
            SKU: "Regular",
            Quantity: 1,
            Total: totale,
          },
        ],
        Payment: {
          CurrencyCode: "AUD",
          TotalAmount: totale,
          InvoiceNumber: "INV" + generateInvoice + user.state,
          InvoiceDescription: "Regular",
          InvoiceReference: generateInvoice,
        },
        RedirectUrl: process.env.FRONTEND_URL + "payment_standard_loading",
        TransactionType: "Purchase",
        Capture: true,
      })
      .then(function (response) {
        if (response.getErrors().length == 0) {
          var accessCode = response.get("AccessCode");
          var formUrl = response.get("FormActionURL");
        }
        console.log(formUrl);
        console.log(accessCode);
        res.json({
          formUrl,
          accessCode,
          expiryDate: req.query.expiryDate,
        });
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ====== PAYMENT REGISTER (from CreditCardRegLoading.js) ===
router.put("/regFinalise", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const total = parseFloat(req.body.totalAmount / 100);

  const gst = (total - total / 1.1).toFixed(2);

  const fee = (total / 1.1).toFixed(2);

  // Generate local timezone for MongoDB
  let now = new Date();
  now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  // Generate expireDate
  const expiry = new Date();

  expiry.setDate(expiry.getDate() + req.body.expireIn);
  const dag = expiry.getDate().toString();
  const year = expiry.getFullYear();

  const finishDate = expiry.toString();

  const storeExp = new Date(req.body.expiryDate);

  storeExp.setDate(storeExp.getDate() + 1);

  const jour = finishDate.split(" ")[2];
  const annee = finishDate.split(" ")[3];
  const mois = finishDate.split(" ")[1];
  const finish = `${jour} ${mois} ${annee}`;

  const list = new Listing({
    createdAt: now,
    isPaid: req.body.isPaid,
    caseId: req.body.state + `${year}${dag}` + generateCaseId,
    contractType: req.body.contractType,
    professions: req.body.professions,
    about: req.body.about,
    isActiveJob: req.body.isActiveJob,
    todaysDate: req.body.todaysDate,
    streetNo: req.body.streetNo,
    street: req.body.street,
    suburb: req.body.suburb,
    postalCode: req.body.postalCode,
    state: req.body.state,
    country: req.body.country,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    // standard
    filename: user.filename,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    expiryDate: storeExp,
    finishDate: finish,
  });

  const storedList = await list.save();

  const payment = new Payment({
    isPaid: req.body.isPaid,
    invoiceNumber: req.body.invoiceNumber,
    totalAmount: total.toFixed(2),
    gst: gst,
    dateIssued: moment().format("DD MMM YYYY"),
    createdAt: now,
    // Employer
    firstName: user.firstName,
    lastName: user.lastName,
    email: req.body.email,
    phone: user.phone,
    contractType: req.body.contractType,
    professions: req.body.professions,
    caseId: list.caseId,
    streetNo: user.streetNo,
    street: user.street,
    suburb: user.suburb,
    postalCode: user.postalCode,
    state: user.state,
    country: user.country,
    latitude: user.latitude,
    longitude: user.longitude,
  });

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const date = moment().format("DD MMM YYYY");
  const mc = "https://i.ibb.co/TrWvXBB/mc.png";
  const visa = "https://i.ibb.co/zSDYxhX/visa.png";
  const amex = "https://i.ibb.co/7j3gRNH/amex.png";
  const firstName = user.firstName;
  const lastName = user.lastName;
  const phone = user.phone;
  const email = req.body.email;
  const invoice = req.body.invoiceNumber;
  const caseId = list.caseId;
  const status = "PAID";
  const product = "Standard Service";
  const streetNo = user.streetNo;
  const street = user.street;
  const suburb = user.suburb;
  const postalCode = user.postalCode;
  const state = user.state;
  const country = user.country;
  const professions = req.body.professions;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  pdfContent(
    invoice,
    logo,
    mc,
    visa,
    amex,
    firstName,
    lastName,
    email,
    phone === undefined ? "" : phone,
    date,
    professions,
    product,
    total.toFixed(2),
    fee,
    gst,
    streetNo === undefined ? "" : streetNo,
    street === undefined ? "" : street,
    suburb === undefined ? "" : suburb,
    state === undefined ? "" : state,
    postalCode === undefined ? "" : postalCode,
    country === undefined ? "" : country,
    thisyear,
    status
  );

  await page.setContent(pdfOutput);

  await page.pdf({
    path: `./public/uploads/${invoice}.pdf`,
    format: "A4",
    printBackground: true,
  });

  paymentConfirmation(
    caseId,
    invoice,
    email,
    firstName,
    date,
    total.toFixed(2),
    thisyear,
    logo,
    product,
    status
  );

  const pathToAttachment = `./public/uploads/${invoice}.pdf`;
  const attachment = fs.readFileSync(pathToAttachment).toString("base64");

  // Save to AWS S3 Bucket
  const result = await uploadInvoice(invoice, pathToAttachment);
  await unlinkFile(pathToAttachment);

  const subject = `Payment Invoice ${invoice}`;
  const to = `${email}`;
  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  const attachments = [
    {
      content: attachment,
      filename: `${invoice}.pdf`,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];

  sendEmail(to, from, subject, output, attachments);
  await browser.close();
  try {
    const storePayment = await payment.save();
    res.send(storePayment);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "payment_failed");
  }
});

// ====== PAYMENT REGISTER (from QuestionReview.js) =====
router.post("/free", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const total = 0;

  const gst = (total - total / 1.1).toFixed(2);

  const fee = (total / 1.1).toFixed(2);

  const dt = new Date();
  const year = dt.getFullYear();
  const dag = dt.getDate();

  // Generate local timezone for MongoDB
  let now = new Date();
  now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  // Generate expireDate

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + req.body.freeDays);

  const finishDate = expiryDate.toString();

  const jour = finishDate.split(" ")[2];
  const annee = finishDate.split(" ")[3];
  const mois = finishDate.split(" ")[1];
  const finish = `${jour} ${mois} ${annee}`;

  const storeExp = new Date(req.query.expiryDate);

  storeExp.setDate(storeExp.getDate() + 1);

  const list = new Listing({
    isPaid: req.body.isPaid,
    createdAt: now,
    caseId: req.body.state + `${year}${dag}` + generateCaseId,
    contractType: req.body.contractType,
    professions: req.body.professions,
    about: req.body.about,
    isActiveJob: req.body.isActiveJob,
    todaysDate: req.body.todaysDate,
    streetNo: req.body.streetNo,
    street: req.body.street,
    suburb: req.body.suburb,
    postalCode: req.body.postalCode,
    state: req.body.state,
    country: req.body.country,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    // standard
    filename: req.body.filename,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: user.phone,
    expiryDate: storeExp,
    finishDate: finish,
  });

  const storedList = await list.save();

  const payment = new Payment({
    isPaid: req.body.isPaid,
    invoiceNumber: "INV" + generateInvoice + list.state,
    totalAmount: total.toFixed(2),
    gst: gst,
    dateIssued: moment().format("DD MMM YYYY"),
    createdAt: now,
    // Employer
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    contractType: req.body.contractType,
    professions: req.body.professions,
    caseId: list.caseId,
    streetNo: user.streetNo,
    street: user.street,
    suburb: user.suburb,
    postalCode: user.postalCode,
    state: user.state,
    country: user.country,
    latitude: user.latitude,
    longitude: user.longitude,
  });

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const date = moment().format("DD MMM YYYY");
  const mc = "https://i.ibb.co/TrWvXBB/mc.png";
  const visa = "https://i.ibb.co/zSDYxhX/visa.png";
  const amex = "https://i.ibb.co/7j3gRNH/amex.png";
  const firstName = payment.firstName;
  const lastName = payment.lastName;
  const phone = user.phone;
  const email = user.email;
  const invoice = payment.invoiceNumber;
  const caseId = payment.caseId;
  const status = "NO CHARGE";
  const product = "Standard Service";
  const streetNo = payment.streetNo;
  const street = payment.street;
  const suburb = payment.suburb;
  const postalCode = payment.postalCode;
  const state = payment.state;
  const country = payment.country;
  const professions = payment.professions;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  pdfContent(
    invoice,
    logo,
    mc,
    visa,
    amex,
    firstName,
    lastName,
    email,
    phone === undefined ? "" : phone,
    date,
    professions,
    product,
    total.toFixed(2),
    fee,
    gst,
    streetNo === undefined ? "" : streetNo,
    street === undefined ? "" : street,
    suburb === undefined ? "" : suburb,
    state === undefined ? "" : state,
    postalCode === undefined ? "" : postalCode,
    country === undefined ? "" : country,
    thisyear,
    status
  );

  await page.setContent(pdfOutput);

  await page.pdf({
    path: `./public/uploads/${invoice}.pdf`,
    format: "A4",
    printBackground: true,
  });

  paymentConfirmation(
    caseId,
    invoice,
    email,
    firstName,
    date,
    total.toFixed(2),
    thisyear,
    logo,
    product,
    status
  );

  const pathToAttachment = `./public/uploads/${invoice}.pdf`;
  const attachment = fs.readFileSync(pathToAttachment).toString("base64");

  // Save to AWS S3 Bucket
  const result = await uploadInvoice(invoice, pathToAttachment);
  await unlinkFile(pathToAttachment);

  const subject = `Payment Invoice ${invoice}`;
  const to = `${email}`;

  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  const attachments = [
    {
      content: attachment,
      filename: `${invoice}.pdf`,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];

  sendEmail(to, from, subject, output, attachments);
  await browser.close();

  try {
    const storePayment = await payment.save();
    res.send(storePayment);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "payment_failed");
  }
});

//========= GET INVOICES.JS (from Invoices.js) ============
router.get("/invoices", async (req, res) => {
  Payment.paginate({}, {}).then(async (result) => {
    const email = req.query.email;
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "-1") {
      sort = -1;
    }
    let match = {
      $or: [
        { isPaidLocum: true, email: email },
        { isPaid: true, email: email },
      ],
    };

    // Contract Type
    if (req.query.contract) {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Created Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;

      const finish = new Date(req.query.finishDate);

      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Payment.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const invoices = await Payment.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        invoices: invoices,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======== SORT (From invoices.js) ==========
router.get("/sortinvoices", async (req, res) => {
  Payment.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let email = req.query.email;
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "-1") {
      sort = -1;
    }

    let match = {
      $or: [
        { isPaidLocum: true, email: email },
        { isPaid: true, email: email },
      ],
    };

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = new Date(req.query.finishDate);
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    // ALL THE VARIOUS SORTS
    if (req.query.name === "Invoice No.") {
      thisSort["invoiceNumber"] = sort;
    }
    if (req.query.name === "Case Id") {
      thisSort["caseId"] = sort;
    }

    if (req.query.name === "Contract Type") {
      thisSort["contractType"] = sort;
    }
    if (req.query.name === "Total Paid") {
      thisSort["totalAmount"] = sort;
    }
    if (req.query.name === "GST") {
      thisSort["totalAmount"] = sort;
    }
    if (req.query.name === "Status") {
      thisSort["totalAmount"] = sort;
    }
    if (req.query.name === "Date Paid") {
      thisSort["createdAt"] = sort;
    }
    if (req.query.name === "Date Issued") {
      thisSort["createdAt"] = sort;
    }

    const num = await Payment.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    try {
      const invoices = await Payment.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        invoices: invoices,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//========= GET INVOICE.JS (from Invoice.js) ============
router.get("/invoice/:invoiceNumber", async (req, res) => {
  const invoice = await Payment.findOne({
    invoiceNumber: req.params.invoiceNumber,
  });

  if (invoice === null) {
    res.redirect(process.env.FRONTEND_URL + "invoices");
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "invoice/" + req.params.invoiceNumber
    );
  }
});

//============ GET INVOICE PAGE ==============
router.get("/invoicenumber/:invoiceNumber", async (req, res) => {
  try {
    const invoice = await Payment.findOne({
      invoiceNumber: req.params.invoiceNumber,
    });

    const gst = invoice.gst.toFixed(2);
    const total = invoice.totalAmount.toFixed(2);
    const nakedFee = (invoice.totalAmount / 1.1).toFixed(2);

    res.status(200).json({ invoice, gst, total: total, nakedFee: nakedFee });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

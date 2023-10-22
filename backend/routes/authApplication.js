const express = require("express");
const router = express.Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const cron = require("node-cron");
require("dotenv/config");

// Imports
const Pub = require("../models/applicationModel");
const Listing = require("../models/listingModel");
const Profession = require("../models/professionModel");
const User = require("../models/userModel");
const Locum = require("../models/locumModel");
const { uploadResume, uploadCover } = require("../../s3");
const { applicationValidation } = require("../validation");
const { locumApplication, sendLocumEmail } = require("../emails/sendEmail");

// ======== CRON JOB - Schedule tasks to be run on the server ======== //.
cron.schedule(
  "*/30 * * * *",
  async () => {
    let today = new Date();
    today = today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    let match = { isSelected: { $ne: true }, expiryOffer: { $lt: today } };

    await Pub.deleteMany(match);

    console.log(`cron performed on Applications ${today}`);
  },
  {
    scheduled: true,
    timezone: "Australia/Sydney",
  }
);

// ========= APPLICATIONS (from ad_details.js) =======
router.post("/applications", async (req, res, next) => {
  const { error } = applicationValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  const match = { email: req.body.email };

  // Check no clashing

  const applications = await Pub.find({
    email: req.body.email,
    contractType: "Locum",
    isRejected: false,
    isSelected: true,
  });

  let startArr = [];
  for (var i = 0; i < applications.length; i++) {
    var results = applications[i].available_start;
    startArr.push(results);
  }
  match["available_start"] = startArr;

  let finishArr = [];
  for (var i = 0; i < applications.length; i++) {
    var results = applications[i].available_finish;
    finishArr.push(results);
  }
  match["available_finish"] = finishArr;

  for (let i = 0; i < startArr.length; i++) {
    let difference = new Date(req.body.available_start) - new Date(startArr[i]);
    const second = Math.floor(difference / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    let noDay = Math.ceil(hour / 24) + 1;

    let interval = new Date(req.body.available_finish) - new Date(startArr[i]);
    const sec = Math.floor(interval / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    let noJour = Math.ceil(hr / 24) + 1;

    let dayDifference = new Date(finishArr[i]) - new Date(startArr[i]);
    const seconds = Math.floor(dayDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    let noDays = Math.ceil(hours / 24) + 1;

    const start = new Date(startArr[i]).getDate();
    const lengthOfDays = start + noDays;

    if (difference > 0 && noDays >= noDay)
      return res.status(400).json({
        invalid:
          "You have a date clash with one of your commitments. You may wish to review <a href='/calendar'> My Calendar</a> for confirmation.",
      });

    if (interval > 0 && noDays >= noJour)
      return res.status(400).json({
        invalid:
          "You have a date clash with one of your commitments. You may wish to review <a href='/calendar'> My Calendar</a> for confirmation.",
      });
  }

  // Generate local timeone for MongoDB
  let dt = new Date();
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  const expiryOffer = new Date(req.query.expiryDate);

  expiryOffer.setDate(expiryOffer.getDate() + 3);

  const application = new Pub({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contractType: req.body.contractType,
    dateAdListed: req.body.dateAdListed,
    available_start: req.body.available_start,
    available_finish: req.body.available_finish,
    professions: req.body.professions,
    nanoId: req.body.nanoId,
    slugId: req.body.slugId,
    nanoslug: req.body.nanoId + req.body.slugId,
    caseId: req.body.caseId,
    isLocum: req.body.isLocum,
    photo: req.body.photo,
    phone: req.body.phone,
    email: req.body.email,
    locum_startDate: req.body.locum_startDate,
    locum_finishDate: req.body.locum_finishDate,
    locum_ahpra: req.body.locum_ahpra,
    locum_airport: req.body.locum_airport,
    locum_payroll: req.body.locum_payroll,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    streetNo: req.body.streetNo,
    street: req.body.street,
    suburb: req.body.suburb,
    state: req.body.state,
    postalCode: req.body.postalCode,
    country: req.body.country,
    airport: req.body.airport,
    accommodation: req.body.accommodation,
    airtravel: req.body.airtravel,
    roadtravel: req.body.roadtravel,
    normal_rate: req.body.normal_rate,
    sat_rate: req.body.sat_rate,
    sun_rate: req.body.sun_rate,
    ph_rate: req.body.ph_rate,
    dateApplied: moment().format("DD MMM YYYY"),
    expiryOffer: expiryOffer,
    createdAt: dt,
  });

  const storedApplication = await application.save();

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const applicant_firstName = req.body.firstName;
  const employer = await Listing.findOne({ slug: req.body.slugId });
  const employer_firstName = employer.firstName;
  const email = employer.email;
  const caseId = employer.caseId;
  const professions = employer.professions;

  locumApplication(
    employer_firstName,
    caseId,
    email,
    applicant_firstName,
    thisyear,
    logo,
    professions
  );

  const subject = `Case ID: ${caseId} has a new application`;
  const to = `${email}`;
  const from = {
    email: "info@medclicker.com.au",
    name: "Medclicker Customer Support",
  };

  sendLocumEmail(to, from, subject, output);

  res.send(storedApplication);
});

//=========== GET APPLIED OR NOT (from ad_details.js) ============

router.get("/Ad_details/:slug", async (req, res, next) => {
  const nanoslug = req.query.nanoId + req.params.slug;
  try {
    const applied = await Pub.find({ nanoslug: nanoslug });

    res.status(200).json({ applied: applied });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET APPLICATIONSMANAGER.JS ==============
router.get("/applicationsmanager", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let email = req.query.email;
    let match = { email };

    // Contract Type
    if (req.query.contract !== "") {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Professions
    if (req.query.professions !== "") {
      const breakProfessions = req.query.professions;
      const professionArr = breakProfessions.split(",");
      const ans = { professions: professionArr };

      let professions = [];
      if (professionArr) {
        professions = professionArr;
        match["professions"] = professions;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    try {
      const candidates = await Pub.find({
        email: email,
        slugId: req.query.slug,
      }).sort({ createdAt: "desc" });

      console.log(match, "match");

      const professions = await Profession.find({ showProfession: true });

      const num = await Pub.find(match).countDocuments();
      let perPage = 10;
      let maxPage = Math.ceil(num / perPage);

      const page =
        req.query.page && num > perPage ? parseInt(req.query.page) : 1;

      const applications = await Pub.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        applications: applications,
        candidates: candidates,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        professions: professions,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ GET APPLICATIONSMANAGER.JS ==============
router.get("/getList", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }
    let email = req.query.email;
    let match = {};

    // Contract Type
    if (req.query.contract !== "") {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Professions
    if (req.query.professions !== "") {
      const breakProfessions = req.query.professions;
      const professionArr = breakProfessions.split(",");
      const ans = { professions: professionArr };

      let professions = [];
      if (professionArr) {
        professions = professionArr;
        match["professions"] = professions;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    try {
      const candidates = await Pub.find({
        email: email,
        slugId: req.query.slug,
      }).sort({ createdAt: "desc" });

      const candidat = await Pub.find({
        email: email,
      }).sort({ createdAt: "desc" });

      let slugArr = [];
      for (var i = 0; i < candidat.length; i++) {
        var results = candidat[i].slugId;
        slugArr.push(results);
      }
      match["slug"] = slugArr;

      console.log(match, "match");
      const professions = await Profession.find({ showProfession: true });
      const num = await Listing.find(match).countDocuments();
      let perPage = 10;
      let maxPage = Math.ceil(num / perPage);
      const page =
        req.query.page && num > perPage ? parseInt(req.query.page) : 1;

      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        professions: professions,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// Applications Manager Your application Slug Number
router.get("/myapplications/:slug", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};
    const email = req.query.email;

    // Contract Type
    if (req.query.contract !== "") {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
      }
    }

    // Professionss
    if (req.query.professions !== "") {
      const breakProfessions = req.query.professions;
      const professionArr = breakProfessions.split(",");
      const ans = { professions: professionArr };

      let professions = [];
      if (professionArr) {
        professions = professionArr;
        match["professions"] = professions;
      }
    }

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    try {
      const candidates = await Pub.find({
        email: email,
        slugId: req.params.slug,
      }).sort({ createdAt: "desc" });

      const candidat = await Pub.find({
        email: email,
      }).sort({ createdAt: "desc" });

      let slugArr = [];
      for (var i = 0; i < candidat.length; i++) {
        var results = candidat[i].slugId;
        slugArr.push(results);
      }
      match["slug"] = slugArr;

      console.log(match, "match");

      const num = await Listing.find(match).countDocuments();
      let perPage = 10;
      let maxPage = Math.ceil(num / perPage);
      const page =
        req.query.page && num > perPage ? parseInt(req.query.page) : 1;

      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
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

// ============= WITHDRAW APPLICATION ================
router.delete("/withdraw/:slug/:nanoId", async (req, res) => {
  const nanoslug = req.params.nanoId + req.params.slug;

  const withdraw = await Pub.deleteOne({ nanoslug: nanoslug });
  res.send(withdraw);
});

//========= GET LOCUM FOR PAYMENT  (from creditcard.js) ===========
router.get("/candidate/:nanoslug", async (req, res) => {
  try {
    const candidate = await Pub.findOne({ nanoslug: req.params.nanoslug });

    const locum_startDate = candidate.locum_startDate.toString();
    const locum_finishDate = candidate.locum_finishDate.toString();

    const day = locum_startDate.split(" ")[2];
    const mth = locum_startDate.split(" ")[1];
    const year = locum_startDate.split(" ")[3];
    const dag = locum_finishDate.split(" ")[2];
    const maand = locum_finishDate.split(" ")[1];
    const jaar = locum_finishDate.split(" ")[3];
    const startDate = `${day} ${mth} ${year}`;
    const finishDate = `${dag} ${maand} ${jaar}`;

    const startingDay = new Date(startDate);
    const endingDay = new Date(finishDate);

    const dayDifference = endingDay - startingDay;
    const seconds = Math.floor(dayDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const noDays = Math.floor(hours / 24) + 1;

    res.status(200).json({
      candidate: candidate,
      startDate: startDate,
      finishDate: finishDate,
      noDays: noDays,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ UPLOAD RESUME ==============

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./frontend/public/resumes/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload SINGLE FILE
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("resumeFile");

// Init upload MULTIPLE FILES
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("resumeFile", 2);

function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /pdf|docx|doc/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Files Only!");
  }
}
// =========== SINGLE RESUME UPLOAD ===============
router.post("/singleUpload", async (req, res) => {
  const email = req.query.email;
  const candidate = await User.findOne({ email: email });

  const caseId = req.query.caseId;
  const list = await Listing.findOne({ caseId: caseId });

  // Generate local timeone for MongoDB
  let dt = new Date();
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  try {
    uploadSingle(req, res, async (err) => {
      if (req.file === undefined) {
        res.redirect(process.env.FRONTEND_URL + "Ad_details_std/" + list.slug);
      } else {
        const result = await uploadResume(req.file);
        await unlinkFile(req.file.path);

        const application = new Pub({
          createdAt: dt,
          // applicant (11)
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          nanoId: candidate.nanoId,
          photo: candidate.photo,
          phone: candidate.phone,
          email: req.query.email,
          isLocum: candidate.isLocum,
          ahpra: req.query.ahpra,
          workstatus: req.query.status,
          resume: result.Location,
          //employer (15)
          caseId: req.query.caseId,
          slugId: list.slug,
          contractType: list.contractType,
          professions: list.professions,
          dateAdListed: list.todaysDate,
          nanoslug: candidate.nanoId + list.slug,
          latitude: list.latitude,
          longitude: list.longitude,
          streetNo: list.streetNo,
          street: list.street,
          suburb: list.suburb,
          state: list.state,
          postalCode: list.postalCode,
          country: list.country,
          expiryOffer: list.expiryDate,
          dateApplied: moment().format("DD MMM YYYY"),
        });
        const storedApplication = await application.save();
        console.log(storedApplication);
        res.redirect(process.env.FRONTEND_URL + "applicationSent");
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// =========== MUTILPLE RESUME AND COVER LETTER UPLOAD ===============
router.post("/upload", async (req, res) => {
  const email = req.query.email;
  const candidate = await User.findOne({ email: email });

  const caseId = req.query.caseId;
  const list = await Listing.findOne({ caseId: caseId });

  // Generate local timezone for MongoDB
  let dt = new Date();
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  try {
    upload(req, res, async (err) => {
      if (req.files === undefined) {
        res.redirect(process.env.FRONTEND_URL + "Ad_details_std/" + list.slug);
      } else {
        const result = await uploadResume(req.files[0]);
        await unlinkFile(req.files[0].path);
        const resultat = await uploadCover(req.files[1]);
        await unlinkFile(req.files[1].path);

        const application = new Pub({
          createdAt: dt,
          // applicant (11)
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          nanoId: candidate.nanoId,
          photo: candidate.photo,
          phone: candidate.phone,
          email: req.query.email,
          isLocum: candidate.isLocum,
          ahpra: req.query.ahpra,
          workstatus: req.query.status,
          resume: result.Location,
          coverLetter: resultat.Location ? resultat.Location : "",
          //employer (15)
          caseId: req.query.caseId,
          slugId: list.slug,
          contractType: list.contractType,
          professions: list.professions,
          dateAdListed: list.todaysDate,
          nanoslug: candidate.nanoId + list.slug,
          latitude: list.latitude,
          longitude: list.longitude,
          streetNo: list.streetNo,
          street: list.street,
          suburb: list.suburb,
          state: list.state,
          postalCode: list.postalCode,
          country: list.country,
          expiryOffer: list.expiryDate,
          dateApplied: moment().format("DD MMM YYYY"),
        });
        const storedApplication = await application.save();
        console.log(storedApplication);
        res.redirect(process.env.FRONTEND_URL + "applicationSent");
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ APPLIED (from searchlist.js) ==============

router.get("/applied", async (req, res, next) => {
  try {
    const applied = await Pub.find({ nanoId: req.query.nanoId });

    res.status(200).json({ applied: applied });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET DATES (from applicationsManager.js) ==============
router.get("/getdates", async (req, res, next) => {
  try {
    const thisAd = await Pub.find({ slugId: req.query.slug });

    res.status(200).json({ thisAd: thisAd });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ NO RESPONSE BUTTON (from applicationsManager.js) ==============
router.get("/noresponse", async (req, res, next) => {
  try {
    let match = {
      isSelected: false,
      isRejected: false,
      email: req.query.email,
    };

    const candidat = await Pub.find({
      isSelected: false,
      isRejected: false,
      email: req.query.email,
    });

    let array = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slugId;
      array.push(results);
    }
    match["slugId"] = array;

    console.log(match, "match");

    const thisAd = await Pub.find(match);

    res.status(200).json({ thisAd: thisAd });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ HIRED BUTTON (from applicationsManager.js) ==============
router.get("/hired", async (req, res, next) => {
  try {
    let match = { isSelected: true, isRejected: false, email: req.query.email };

    const candidat = await Pub.find({
      isSelected: true,
      isRejected: false,
      email: req.query.email,
    });

    let array = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slugId;
      array.push(results);
    }
    match["slugId"] = array;

    console.log(match, "match");

    const thisAd = await Pub.find(match);

    res.status(200).json({ thisAd: thisAd });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ REJECTED BUTTON (from applicationsManager.js) ==============
router.get("/nothired", async (req, res, next) => {
  try {
    let match = { isSelected: false, isRejected: true, email: req.query.email };

    const candidat = await Pub.find({
      isSelected: false,
      isRejected: true,
      email: req.query.email,
    });

    let array = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slugId;
      array.push(results);
    }
    match["slugId"] = array;

    console.log(match, "match");

    const thisAd = await Pub.find(match);

    res.status(200).json({ thisAd: thisAd });
  } catch (err) {
    res.status(500).json(err);
  }
});

//======= GET LCOUMAGREEMENTS.JS (from LocumAgreements.js) ======
router.get("/agreements", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    const email = req.query.email;

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }
    let match = {
      isSelected: true,
      isRejected: false,
      email: email,
    };

    // Created Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;

      const finish = new Date(req.query.finishDate);

      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Pub.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const contracts = await Pub.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        contracts: contracts,
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

//============ GET EMPLOYER WHO HIRED LOCUM (from LocumAgreements.js) ==============
router.get("/thisAd", async (req, res, next) => {
  try {
    let match = { isPaidLocum: true, isActiveJob: false };

    const candidat = await Pub.find({
      isSelected: true,
      isRejected: false,
    });

    let array = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slugId;
      array.push(results);
    }
    match["slug"] = array;

    console.log(match, "match");

    const thisAd = await Listing.find(match);

    res.status(200).json({ thisAd: thisAd });
  } catch (err) {
    res.status(500).json(err);
  }
});

//======== SORT (From LocumAgreements.js) ==========
router.get("/sortagreements", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let email = req.query.email;
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {
      isSelected: true,
      isRejected: false,
      email: email,
    };

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = new Date(req.query.finishDate);
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    // ALL THE VARIOUS SORTS
    if (req.query.name === "Case Id") {
      thisSort["caseId"] = sort;
    }

    if (req.query.name === "Employer Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "From Date") {
      thisSort["locum_startDate"] = sort;
    }
    if (req.query.name === "To Date") {
      thisSort["locum_finishDate"] = sort;
    }
    if (req.query.name === "Date Applied") {
      thisSort["createdAt"] = sort;
    }
    if (req.query.name === "Your Location") {
      thisSort["postalCode"] = sort;
    }
    if (req.query.name === "Date Issued") {
      thisSort["createdAt"] = sort;
    }

    const num = await Pub.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    try {
      const contracts = await Pub.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        contracts: contracts,
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

//========= GET AGREEMENT.JS (from LocumAgreements.js) ============
router.get("/agreement/:caseId", async (req, res) => {
  const caseId = await Pub.findOne({
    caseId: req.params.caseId,
  });

  if (caseId === null) {
    res.redirect(process.env.FRONTEND_URL + "agreements");
  } else {
    res.redirect(process.env.FRONTEND_URL + "agreement/" + req.params.caseId);
  }
});

//============ GET AGREEMENT PAGE ==============
router.get("/contract/:caseId", async (req, res) => {
  try {
    const caseId = await Pub.findOne({
      caseId: req.params.caseId,
    });

    const list = await Listing.findOne({
      slug: caseId.slugId,
    });

    const user = await User.findOne({
      email: list.email,
    });

    const locum = await Locum.findOne({
      email: list.email,
    });

    res
      .status(200)
      .json({ caseId: caseId, list: list, user: user, locum: locum });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= EMPLOYER VIEW APPLICANT =================
router.put("/seen", async (req, res) => {
  let set = {};
  set["seen"] = true;
  const nanoslug = req.query.nanoId + req.query.slugId;

  await Pub.updateOne({ nanoslug: nanoslug }, { $set: set });

  const candidat = await Listing.find({
    nanoId: req.query.nanoId,
    isActiveJob: true,
  });

  let slugArr = [];
  for (var i = 0; i < candidat.length; i++) {
    var results = candidat[i].slug;
    slugArr.push(results);
  }

  const newApplicants = await Pub.find({
    slugId: slugArr,
    seen: false,
    isRejected: false,
  });

  res.send({
    newApplicants: newApplicants,
  });
});

//============ GET CALENDAR.JS ==============
router.get("/calendar", async (req, res) => {
  let email = req.query.email;
  const match = {
    contractType: "Locum",
    isPaidLocum: true,
    isActiveJob: false,
  };

  try {
    const applications = await Pub.find({
      email: email,
      contractType: "Locum",
      isRejected: false,
      isSelected: true,
    });

    let slugArr = [];
    for (var i = 0; i < applications.length; i++) {
      var results = applications[i].slugId;
      slugArr.push(results);
    }
    match["slug"] = slugArr;

    console.log(match, "match");
    const adPosts = await Listing.find(match);

    res.status(200).json({
      applications: applications,
      adPosts: adPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

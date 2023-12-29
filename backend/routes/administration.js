const express = require("express");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util");
const moment = require("moment");
const puppeteer = require("puppeteer");
require("dotenv/config");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// Imports
const User = require("../models/userModel");
const Profession = require("../models/professionModel");
const Listing = require("../models/listingModel");
const Locum = require("../models/locumModel");
const Payment = require("../models/paymentModel");
const Pub = require("../models/applicationModel");
const Homepage = require("../models/homepageModel");
const { uploadFile } = require("../../s3");
const { adminValidation, passwordChange } = require("../validation");

const {
  forgotPasswordEmail,
  sendforgotPasswordEmail,
  sendEmail,
  pdfContent,
  paymentConfirmation,
  toLocum,
  pdfContract,
  sendHiredEmail,
} = require("../emails/sendEmail");

// ============= ADMIN RESET PASSWORD (from Asecurity.js) ================
router.put("/securitySettings/:_id", async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  //LETS VALIDATE THE DATA BEFORE
  const { error } = await passwordChange(req.body);

  if (error) return res.status(400).send({ invalid: error.details[0].message });

  const user = await User.findOne({ _id: req.params._id });

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    User.findByIdAndUpdate(user._id, req.body).then(function () {
      user.password = hashedPassword;
      user.save();
      res.json({ user });
    });
  } catch (error) {
    res.send(error.message);
  }
});

//=================== EMAIL LOGIN (from Admin.js) ================
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE

  const { error } = await adminValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  // Check email if already exist in database
  const { email, password } = req.body;

  const admin = await User.findOne({ email: email, isAdmin: true });

  // Password is correct?
  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass)
    return res
      .status(400)
      .send(
        "Email or password incorrect. Please check your inputs and try again."
      );

  if (!admin) {
    const errorMessage =
      "Email or password incorrect. Please check your inputs and try again..";
    res.status.send(errorMessage);
  } else {
    const token = generateToken(admin);
    res.cookie("adminToken", token, { httpOnly: false });
    res.json({ admin, token });
  }
});

//======== CREATE NEW PROFESSION (from AProfessions.js) ==========
router.post("/profession", async (req, res) => {
  try {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    // Check profession if already exist in database
    const profExist = await Profession.findOne({
      contractType: req.body.contractType,
      professionName: req.body.professionName,
    });
    if (profExist)
      return res.status(400).json({
        prompt: "Contract Type of this Profession exists already.",
      });

    const profession = new Profession({
      contractType: req.body.contractType,
      professionName: req.body.professionName,
      showProfession: req.body.showProfession,
    });
    const savedProfession = await profession.save();

    const numOfProfessions = await Profession.find({
      showProfession: true,
    }).countDocuments();

    const professions = await Profession.find({
      showProfession: true,
    });

    res.send({
      professions: professions,
      numOfProfessions: numOfProfessions,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//======== SORT BY CONTRACT TYPE (From APROFESSIONS.JS) ==========
router.get("/contractType", async (req, res) => {
  Profession.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    const num = await Profession.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const professions = await Profession.find(match)
        .sort({ contractType: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        professions: professions,
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

//======== SORT BY PROFESSION NAME (From APROFESSIONS.JS) ========
router.get("/sortnames", async (req, res) => {
  Profession.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    const num = await Profession.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const professions = await Profession.find(match)
        .sort({ professionName: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        professions: professions,
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

//========= GET APROFESSIONS.JS (from AProfessions.js) ============
router.get("/professions", async (req, res) => {
  Profession.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    const num = await Profession.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const professions = await Profession.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        professions: professions,
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

// =========== HIDE PROFESSION (from AProfessions.js) ===========
router.put("/hideProf/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await Profession.find({ showProfession: true }).countDocuments();

  let total = await Profession.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;

  try {
    const storedProfession = await Profession.updateOne(
      { _id: req.params.id },
      { showProfession: req.body.showProfession }
    );

    const allProfessions = await Profession.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedProfession: storedProfession,
      num: num,
      total: total,
      allProfessions: allProfessions,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ====== ADMIN DELETE PROFESSION (from AProfessions.js) =========
router.delete("/deleteProfession/:id", async (req, res) => {
  const deleted = await Profession.deleteOne({ _id: req.params.id });
  const professions = await Profession.find();
  const num = await Profession.find().countDocuments();
  let perPage = 25;
  let maxPage = Math.ceil(num / perPage);

  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

  res.json({
    deleted: deleted,
    professions: professions,
    num: num,
    page: page,
    maxPage: maxPage,
  });
});

// ============= BLACLIST AN USER (From Ausers.js) =============
router.put("/blackme/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  let num = await User.find({ isAdmin: true }).countDocuments();

  let total = await User.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;

  try {
    const storedUser = await User.updateOne(
      { _id: req.params.id },
      { isActive: req.body.isActive }
    );

    const justMe = await User.find({ _id: req.params.id });

    let set = {};
    set["isActiveJob"] = false;

    await Listing.updateMany({ email: justMe[0].email }, { $set: set });

    await User.updateOne({ email: justMe[0].email }, { isAdmin: false });

    const blacklisted = await User.find({ isActive: false }).countDocuments();

    const allUsers = await User.find({})
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      justMe: justMe,
      num: num,
      total: total,
      allUsers: allUsers,
      page: page,
      maxPage: maxPage,
      sort: sort,
      blacklisted: blacklisted,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ============ MAKE USER AN ADMIN (From Ausers.js) ============
router.put("/makeAdmin/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await User.find({ isAdmin: true }).countDocuments();

  let total = await User.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await User.updateOne(
      { _id: req.params.id },
      { isAdmin: req.body.isAdmin }
    );

    const allUsers = await User.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      num: num,
      total: total,
      allUsers: allUsers,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//=========== UPLOAD IMAGES (From Ausers.js) ==============

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./frontend/public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  //allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const email = req.query.email;
      const user = await User.findOne({ email });

      if (req.file === undefined) {
        res.json({ invalid: "No files or file not accepted." });
      } else {
        const result = await uploadFile(req.file);
        await unlinkFile(req.file.path);

        let set = {};
        set["filename"] = result.Location;
        await Listing.updateMany({ email: email }, { $set: set });

        User.findByIdAndUpdate(user._id, {
          filename: result.Location,
        }).then(function () {
          User.findOne({ email: req.query.email }).then(function (storedUser) {
            storedUser.save(() => {
              res.json({ newImage: result.Location });
            });
          });
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/upload-locum", async (req, res) => {
  upload(req, res, async (err) => {
    const email = req.query.email;
    const locum = await Locum.findOne({ email });

    if (req.file === undefined) {
      res.json({ invalid: "No files or file not accepted." });
    } else {
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);

      let set = {};
      set["photo"] = req.file.filename;

      await Pub.updateMany({ email: req.query.email }, { $set: set });

      Locum.findByIdAndUpdate(locum._id, {
        filename: result.Location,
      }).then(function () {
        Locum.findOne({ email: req.query.email }).then(function (storedLocum) {
          storedLocum.save(() => {
            res.json({ newImage: result.Location });
          });
        });
      });
    }
  });
});

//=========== GET ALLUSERS PAGE (From Ausers.js) ==============
router.get("/allusers", async (req, res) => {
  User.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }
    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = new Date(req.query.finishDate);
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    const total = await User.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);
    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;
    console.log(match, "match");

    const blacklisted = await User.find({ isActive: false }).countDocuments();

    try {
      const users = await User.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        users: users,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
        blacklisted: blacklisted,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======== SORT (From Ausers.js) ==========
router.get("/sortusers", async (req, res) => {
  User.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = new Date(req.query.finishDate);
      finish.setDate(finish.getDate() + 1);
      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "User ID") {
      thisSort["nanoId"] = sort;
    }
    if (req.query.name === "Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "Email") {
      thisSort["email"] = sort;
    }

    if (req.query.name === "Phone") {
      thisSort["phone"] = sort;
    }

    if (req.query.name === "Survey") {
      thisSort["survey"] = sort;
    }

    if (req.query.name === "Is Admin") {
      thisSort["isAdmin"] = sort;
    }
    if (req.query.name === "Address") {
      thisSort["postalCode"] = sort;
    }
    if (req.query.name === "Blacklist") {
      thisSort["isActive"] = sort;
    }

    const total = await User.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);

    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    const blacklisted = await User.find({ isActive: false }).countDocuments();

    try {
      const users = await User.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        users: users,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
        blacklisted: blacklisted,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//=========== GET ALL LOCUMS PAGE (from ALocums.js) ===========
router.get("/alllocums", async (req, res) => {
  Locum.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    if (req.query.startDate && req.query.finishDate) {
      const start = req.query.startDate;
      const finish = new Date(req.query.finishDate);
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    const total = await Locum.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);
    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;
    console.log(match, "match");
    try {
      const locums = await Locum.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        locums: locums,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======== SORT (From Alocums.js) ==========
router.get("/sortlocums", async (req, res) => {
  Locum.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "Locum ID") {
      thisSort["locumId"] = sort;
    }
    if (req.query.name === "Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "Email") {
      thisSort["email"] = sort;
    }

    if (req.query.name === "Phone") {
      thisSort["phone"] = sort;
    }

    if (req.query.name === "SMS") {
      thisSort["SMStext"] = sort;
    }
    if (req.query.name === "N/L") {
      thisSort["newsletter"] = sort;
    }

    if (req.query.name === "Profession") {
      thisSort["profession"] = sort;
    }
    if (req.query.name === "Visibility") {
      thisSort["showLocum"] = sort;
    }

    if (req.query.name === "Address") {
      thisSort["postalCode"] = sort;
    }

    const total = await Locum.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(total / perPage);

    const page =
      req.query.page && total > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    try {
      const locums = await Locum.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        locums: locums,
        total: total,
        page: page,
        maxPage: maxPage,
        sort: sort,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// ============== HIDE LOCUM (from Alocums.js) ============
router.put("/hideme/:id", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  let num = await Locum.find({ showLocum: true }).countDocuments();

  let total = await Locum.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(total / perPage);
  const page = req.query.page && total > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Locum.updateOne(
      { locumId: req.params.id },
      { showLocum: req.body.showLocum }
    );

    const allLocums = await Locum.find()
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      num: num,
      total: total,
      allLocums: allLocums,
      page: page,
      maxPage: maxPage,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ============ FORGOT PASSWORD =================
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  // Check email if already exist in database
  const user = await User.findOne({ email: req.body.email, isAdmin: true });

  if (user) {
    // User exists and create one-time link (valid for 10 minutes)
    const secret = config.JWT_SECRET;
    const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";

    const thisyear = moment().format("YYYY");
    const firstName = user.firstName;
    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "35m" });
    const link =
      process.env.FRONTEND_URL + `resetpassword/${user._id}/${token}`;
    forgotPasswordEmail(firstName, logo, link, email, thisyear);
    const subject = "Medclicker Reset Password";
    const to = `${email}`;
    const from = {
      email: "info@medclicker.com.au",
      name: "Medclicker Customer Support",
    };
    sendforgotPasswordEmail(to, from, subject, output);
    res.send(user);
  }
  if (!user) {
    return res.status(400).send({ user: "OK" });
  }
});

//============ GET APAYMENTS.JS (From Apayments.js) ==============
router.get("/payments", async (req, res) => {
  Payment.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Payment.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const payments = await Payment.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        payments: payments,
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

//======== SORT (From Apayments.js) ==========
router.get("/sortpayments", async (req, res) => {
  Payment.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

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

    // ALL THE VARIOUS SORTS
    if (req.query.name === "Invoice No.") {
      thisSort["invoiceNumber"] = sort;
    }
    if (req.query.name === "Case ID") {
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
    if (req.query.name === "Payer Name") {
      thisSort["firstName"] = sort;
    }
    if (req.query.name === "Job Location") {
      thisSort["postalCode"] = sort;
    }
    if (req.query.name === "Date Paid") {
      thisSort["createdAt"] = sort;
    }

    const num = await Payment.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const payments = await Payment.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        payments: payments,
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

//=================== SEND INVOICE (from Apayments.js) ================
router.post("/sendinvoice", async (req, res) => {
  const payment = await Payment.findOne({
    invoiceNumber: req.body.invoiceNumber,
  });

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png"; //
  const mc = "https://i.ibb.co/TrWvXBB/mc.png"; //
  const visa = "https://i.ibb.co/zSDYxhX/visa.png"; //
  const amex = "https://i.ibb.co/7j3gRNH/amex.png";
  const thisyear = moment().format("YYYY");
  const date = payment.dateIssued;
  const email = payment.email;
  const phone = payment.phone;
  const firstName = payment.firstName;
  const lastName = payment.lastName;
  const caseId = payment.caseId;
  const status = payment.totalAmount === 0 ? "No Charge" : "PAID";
  const product =
    payment.isPaidLocum === true ? "Locum Service" : "Standard Service";
  const invoice = payment.invoiceNumber;
  const streetNo = payment.streetNo;
  const street = payment.street;
  const suburb = payment.suburb;
  const postalCode = payment.postalCode;
  const state = payment.state;
  const country = payment.country;
  const professions = payment.professions;
  const total = payment.totalAmount;
  const gst = payment.gst;
  const fee = total - gst;

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
    fee.toFixed(2),
    gst.toFixed(2),
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

  try {
    res.send(payment);
  } catch (err) {
    console.error(err);
  }
});

//======== SORT BY INVOICE NAME (From INVOICES.JS) ========
router.get("/sortinvoices", async (req, res) => {
  Payment.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    const num = await Payment.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const payments = await Payment.find(match)
        .sort({ invoiceNumber: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        payments: payments,
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

//=============== SEND AGREEMENTE (from AlocumAgreements.js) ================
router.post("/sendagreement", async (req, res) => {
  const candidate = await Pub.findOne({ caseId: req.body.caseId });
  const locum = await Locum.findOne({ email: candidate.email });
  const post = await Listing.findOne({ slug: candidate.slugId });
  const emp = await User.findOne({ email: post.email });
  const payment = await Payment.findOne({ caseId: req.body.caseId });

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
  const email = post.email;
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
  const dateIssued = payment.dateIssued;

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

//============ GET ALISTING.JS ==============
router.get("/listings", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let isActiveJob = JSON.parse(req.query.isActiveJob);
    let isDeletedJob = JSON.parse(req.query.isDeletedJob);

    let match = { isActiveJob, isDeletedJob };

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

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // IS ACTIVE JOB (NOT PAUSED)
    if (isActiveJob === false) {
      delete match["isActiveJob"];
    } else {
      match["isActiveJob"] === isActiveJob;
    }

    // IS DELETED JOB
    if (isDeletedJob === false) {
      match["isDeletedJob"] === isDeletedJob;
    } else {
      delete match["isDeletedJob"];
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Listing.find(match).countDocuments();

    const noOfCases = await Listing.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
        noOfCases: noOfCases,
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

// ================ HIDE LISTING (from Alistings.js) ===========
router.put("/sleepAd/:slug", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  let isActiveJob = JSON.parse(req.query.isActiveJob);
  let isDeletedJob = JSON.parse(req.query.isDeletedJob);

  let match = { isActiveJob, isDeletedJob };

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

  // Location (STATE)
  if (req.query.location !== "") {
    const breakLocation = req.query.location;
    const stateArr = breakLocation.split(",");
    match["state"] = stateArr;
  }

  // IS ACTIVE JOB (NOT PAUSED)
  if (isActiveJob === false) {
    delete match["isActiveJob"];
  } else {
    match["isActiveJob"] === isActiveJob;
  }

  // IS DELETED JOB
  if (isDeletedJob === false) {
    match["isDeletedJob"] === isDeletedJob;
  } else {
    delete match["isDeletedJob"];
  }

  // Start and Finish Dates
  if (req.query.startDate && req.query.finishDate) {
    const finish = new Date(req.query.finishDate);

    const start = req.query.startDate;
    finish.setDate(finish.getDate() + 1);

    match["createdAt"] = { $gte: start, $lt: finish };
  }

  const num = await Listing.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(num / perPage);
  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Listing.updateOne(
      { slug: req.params.slug },
      { isActiveJob: req.body.isActiveJob }
    );

    const listings = await Listing.find(match)
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      listings: listings,
      sort: sort,
      maxPage: maxPage,
      page: page,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//======== SORT (From Alistings.JS) ==========
router.get("/sortcase", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let isActiveJob = JSON.parse(req.query.isActiveJob);
    let isDeletedJob = JSON.parse(req.query.isDeletedJob);

    let match = { isActiveJob, isDeletedJob };

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

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // IS ACTIVE JOB (NOT PAUSED)
    if (isActiveJob === false) {
      delete match["isActiveJob"];
    } else {
      match["isActiveJob"] === isActiveJob;
    }

    // IS DELETED JOB
    if (isDeletedJob === false) {
      match["isDeletedJob"] === isDeletedJob;
    } else {
      delete match["isDeletedJob"];
    }

    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "Case ID") {
      thisSort["caseId"] = sort;
    }
    if (req.query.name === "Contract Type") {
      thisSort["contractType"] = sort;
    }

    if (req.query.name === "Professions") {
      thisSort["professions"] = sort;
    }

    if (req.query.name === "Publisher Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "Live | Pause") {
      thisSort["isActiveJob"] = sort;
    }

    if (req.query.name === "Email") {
      thisSort["email"] = sort;
    }

    if (req.query.name === "Status") {
      thisSort["isDeletedJob"] = sort;
    }
    if (req.query.name === "Date Listed") {
      thisSort["createdAt"] = sort;
    }

    if (req.query.name === "Listing Address") {
      thisSort["postalCode"] = sort;
    }

    const num = await Listing.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//============ SORT (from Alocumlistings.js)==============
router.get("/locumsonly", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let isActiveJob = JSON.parse(req.query.isActiveJob);
    let isDeletedJob = JSON.parse(req.query.isDeletedJob);

    let match = { isActiveJob, isDeletedJob, contractType: "Locum" };

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // IS ACTIVE JOB (NOT PAUSED)
    if (isActiveJob === false) {
      delete match["isActiveJob"];
    } else {
      match["isActiveJob"] === isActiveJob;
    }

    // IS DELETED JOB
    if (isDeletedJob === false) {
      match["isDeletedJob"] === isDeletedJob;
    } else {
      delete match["isDeletedJob"];
    }

    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Listing.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//======== SORT (From Alocumlistings.JS) ==========
router.get("/sortlocumcase", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let isActiveJob = JSON.parse(req.query.isActiveJob);
    let isDeletedJob = JSON.parse(req.query.isDeletedJob);

    let match = { isActiveJob, isDeletedJob, contractType: "Locum" };

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // IS ACTIVE JOB (NOT PAUSED)
    if (isActiveJob === false) {
      delete match["isActiveJob"];
    } else {
      match["isActiveJob"] === isActiveJob;
    }

    // IS DELETED JOB
    if (isDeletedJob === false) {
      match["isDeletedJob"] === isDeletedJob;
    } else {
      delete match["isDeletedJob"];
    }

    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "Case ID") {
      thisSort["caseId"] = sort;
    }
    if (req.query.name === "Status") {
      thisSort["isPaidLocum"] = sort;
    }

    if (req.query.name === "Professions") {
      thisSort["professions"] = sort;
    }

    if (req.query.name === "Stay") {
      thisSort["accommodation"] = sort;
    }

    if (req.query.name === "Flight") {
      thisSort["airtravel"] = sort;
    }
    if (req.query.name === "Road") {
      thisSort["roadtravel"] = sort;
    }
    if (req.query.name === "Rate") {
      thisSort["normal_rate"] = sort;
    }
    if (req.query.name === "Start Date") {
      thisSort["startDate"] = sort;
    }
    if (req.query.name === "Finish Date") {
      thisSort["finishDate"] = sort;
    }

    if (req.query.name === "Live | Pause") {
      thisSort["isActiveJob"] = sort;
    }

    if (req.query.name === "Status") {
      thisSort["isDeletedJob"] = sort;
    }
    if (req.query.name === "Date Listed") {
      thisSort["createdAt"] = sort;
    }

    const num = await Listing.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,

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

// ================ HIDE LISTING (from Alistings.js) ===========
router.put("/locumSleepAd/:slug", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  let isActiveJob = JSON.parse(req.query.isActiveJob);
  let isDeletedJob = JSON.parse(req.query.isDeletedJob);
  let match = { isActiveJob, isDeletedJob, contractType: "Locum" };

  // Location (STATE)
  if (req.query.location !== "") {
    const breakLocation = req.query.location;
    const stateArr = breakLocation.split(",");
    match["state"] = stateArr;
  }

  // IS ACTIVE JOB (NOT PAUSED)
  if (isActiveJob === false) {
    delete match["isActiveJob"];
  } else {
    match["isActiveJob"] === isActiveJob;
  }

  // IS DELETED JOB
  if (isDeletedJob === false) {
    match["isDeletedJob"] === isDeletedJob;
  } else {
    delete match["isDeletedJob"];
  }

  // Start and Finish Dates
  if (req.query.startDate && req.query.finishDate) {
    const finish = new Date(req.query.finishDate);

    const start = req.query.startDate;
    finish.setDate(finish.getDate() + 1);

    match["createdAt"] = { $gte: start, $lt: finish };
  }

  const num = await Listing.find().countDocuments();

  let perPage = 25;
  let maxPage = Math.ceil(num / perPage);
  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Listing.updateOne(
      { slug: req.params.slug },
      { isActiveJob: req.body.isActiveJob }
    );

    const listings = await Listing.find(match)
      .sort({ createdAt: sort })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      storedUser: storedUser,
      listings: listings,
      sort: sort,
      maxPage: maxPage,
      page: page,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ GET ADMIN DASHBOARD ==============
//from Admin dashboard
router.get("/dashboard/:email", async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.params.email });
    const noOfUsers = await User.find({ isActive: true }).countDocuments();

    // ============= LOCUMS =================

    const activeLocum = await Locum.find({
      showLocum: true,
    }).countDocuments();
    const inactiveLocum = await Locum.find({
      showLocum: false,
    }).countDocuments();

    const noOfLocums = await Locum.find({
      isLocum: true,
    }).countDocuments();

    const nswLocum = await Locum.find({ state: "NSW" }).countDocuments();
    const vicLocum = await Locum.find({
      state: "VIC",
    }).countDocuments();
    const qldLocum = await Locum.find({
      state: "QLD",
    }).countDocuments();
    const waLocum = await Locum.find({
      state: "WA",
    }).countDocuments();
    const ntLocum = await Locum.find({
      state: "NT",
    }).countDocuments();
    const saLocum = await Locum.find({
      state: "SA",
    }).countDocuments();
    const tasLocum = await Locum.find({
      state: "TAS",
    }).countDocuments();
    const actLocum = await Locum.find({
      state: "ACT",
    }).countDocuments();

    // ============= LISTINGS =================

    const activeList = await Listing.find({
      isActiveJob: true,
    }).countDocuments();
    const inactiveList = await Listing.find({
      isActiveJob: false,
      isDeletedJob: false,
    }).countDocuments();

    const expiredList = await Listing.find({
      isActiveJob: false,
      isDeletedJob: true,
    }).countDocuments();

    const nsw = await Listing.find({
      state: "NSW",
      isDeletedJob: false,
    }).countDocuments();
    const vic = await Listing.find({
      state: "VIC",
      isDeletedJob: false,
    }).countDocuments();
    const qld = await Listing.find({
      state: "QLD",
      isDeletedJob: false,
    }).countDocuments();
    const tas = await Listing.find({
      state: "TAS",
      isDeletedJob: false,
    }).countDocuments();
    const sa = await Listing.find({
      state: "SA",
      isDeletedJob: false,
    }).countDocuments();
    const act = await Listing.find({
      state: "ACT",
      isDeletedJob: false,
    }).countDocuments();
    const nt = await Listing.find({
      state: "NT",
      isDeletedJob: false,
    }).countDocuments();
    const wa = await Listing.find({
      state: "WA",
      isDeletedJob: false,
    }).countDocuments();

    // ============= APPLICATIONS =================

    const applications = await Pub.find().countDocuments();

    res.status(200).json({
      admin: admin,
      applications: applications,
      activeLocum: activeLocum,
      inactiveLocum: inactiveLocum,
      nswLocum: nswLocum,
      qldLocum: qldLocum,
      waLocum: waLocum,
      ntLocum: ntLocum,
      noOfLocums: noOfLocums,
      inactiveList: inactiveList,
      activeList: activeList,
      expiredList: expiredList,
      nsw: nsw,
      vic: vic,
      qld: qld,
      sa: sa,
      nt: nt,
      wa: wa,
      act: act,
      sa: sa,
      tas: tas,
      noOfUsers: noOfUsers,
      actLocum: actLocum,
      nswLocum: nswLocum,
      vicLocum: vicLocum,
      qldLocum: qldLocum,
      tasLocum: tasLocum,
      saLocum: saLocum,
      ntLocum: ntLocum,
      waLocum: waLocum,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== ADMIN VIEW USER ============

router.get("/users/:id", async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  if (user === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "adminusers/" + user._id);
  }
});

// ============= ADMIN VIEW Locum =================
router.get("/locumProfile/:locumId", async (req, res) => {
  const locum = await Locum.findOne({ locumId: req.params.locumId });

  if (locum) {
    res.redirect(process.env.FRONTEND_URL + "adminlocum/" + locum.locumId);
  }
});

//============ ADMIN GET LOCUM  ==============
router.get("/profile/:locumId", async (req, res) => {
  try {
    const user = await Locum.findOne({ locumId: req.params.locumId });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== PREVIEW CV ===============
router.get("/resume/:locumId", async (req, res) => {
  const locum = await Locum.findOne({ locumId: req.params.locumId });

  if (locum === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "adminresume/" + req.params.locumId
    );
  }
});

//============ GET LOCUM PROFILE (from Aresume.js) ==============
router.get("/profileResume/:locumId", async (req, res) => {
  try {
    const user = await Locum.findOne({ locumId: req.params.locumId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== PREVIEW CV ===============
router.get("/listingedit/:slug", async (req, res) => {
  const listing = await Listing.findOne({ slug: req.params.slug });

  if (listing.contractType === "Locum") {
    res.redirect(
      process.env.FRONTEND_URL + "adminlistingedit/" + req.params.slug
    );
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "adminlistingeditreg/" + req.params.slug
    );
  }
});

//============ GET AAPPLICATIONS.JS ==============
router.get("/applications", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Pub.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Pub.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//======== SORT (From Aapplications.js) ==========
router.get("/sortapplications", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};

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

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "Case Id") {
      thisSort["caseId"] = sort;
    }
    if (req.query.name === "Applicant Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "Applicant Email") {
      thisSort["email"] = sort;
    }

    if (req.query.name === "Date Listed") {
      thisSort["dateAdListed"] = sort;
    }

    if (req.query.name === "Contract Type") {
      thisSort["contractType"] = sort;
    }

    if (req.query.name === "Professions") {
      thisSort["professions"] = sort;
    }
    if (req.query.name === "Seen") {
      thisSort["seen"] = sort;
    }
    if (req.query.name === "Progress") {
      thisSort["isRejected"] = sort;
    }

    if (req.query.name === "Applicant Address") {
      thisSort["postalCode"] = sort;
    }
    if (req.query.name === "Date Applied") {
      thisSort["createdAt"] = sort;
    }

    const num = await Pub.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");

    try {
      const adPosts = await Pub.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//============ GET ALOCUMAGREEMENTS.JS ==============
router.get("/locum_applications", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { contractType: "Locum", isSelected: true, isRejected: false };

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }

    const num = await Pub.find(match).countDocuments();

    let perPage = 25;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Pub.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//======== SORT (From Alocumagreements.js) ==========
router.get("/sortlocum_applications", async (req, res) => {
  Pub.paginate({}, {}).then(async (result) => {
    const thisSort = {};

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { contractType: "Locum" };

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Start and Finish Dates
    if (req.query.startDate && req.query.finishDate) {
      const finish = new Date(req.query.finishDate);

      const start = req.query.startDate;
      finish.setDate(finish.getDate() + 1);

      match["createdAt"] = { $gte: start, $lt: finish };
    }
    // ALL THE VARIOUS SORTS
    if (req.query.name === "Case Id") {
      thisSort["caseId"] = sort;
    }
    if (req.query.name === "Profession") {
      thisSort["profession"] = sort;
    }

    if (req.query.name === "Locum Name") {
      thisSort["firstName"] = sort;
    }

    if (req.query.name === "Locum Location") {
      thisSort["postalCode"] = sort;
    }

    if (req.query.name === "From Date") {
      thisSort["locum_startDate"] = sort;
    }
    if (req.query.name === "To Date") {
      thisSort["locum_finishDate"] = sort;
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
      const adPosts = await Pub.find(match)
        .sort(thisSort)
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        adPosts: adPosts,
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

//============ GET HOMEPAGE DATA ==============
//from homepage and Dashboard
router.get("/homepage", async (req, res) => {
  try {
    const noOfCases = await Listing.find({
      isActiveJob: true,
    }).countDocuments();

    const noOfUsers = await User.findOne({}).countDocuments();

    const plans = await Homepage.findOne({ isAdmin: true });

    res.status(200).json({
      noOfCases: noOfCases,
      noOfUsers: noOfUsers,
      plans: plans,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/homepage", async (req, res, next) => {
  try {
    if (req.body._id !== "") {
      Homepage.findByIdAndUpdate(req.body._id, req.body).then(function () {
        Homepage.findById(req.body._id).then(function (savedPlan) {
          savedPlan.save();
          res.send(savedPlan);
        });
      });
    } else {
      // Generate local timeone for MongoDB
      let dt = new Date();
      dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

      const homepage = new Homepage({
        createdAt: dt,
        messageOn: req.body.messageOn,
        messageToAll: req.body.messageToAll,
        swiperOn: req.body.swiperOn,
        comment1: req.body.comment1,
        comment2: req.body.comment2,
        comment3: req.body.comment3,
        comment4: req.body.comment4,
        commentator1: req.body.commentator1,
        commentator2: req.body.commentator2,
        commentator3: req.body.commentator3,
        commentator4: req.body.commentator4,
      });
      const savedPlan = await homepage.save();
      console.log(savedPlan);
      res.send(savedPlan);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

//========== GET PAYMENT PLANS DATA (from Apayments.js) =========
router.get("/storedInfo", async (req, res) => {
  try {
    const plans = await Homepage.findOne({ isAdmin: true });
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET PROFESSIONS IN FOOTER (from Footer.js) ==============
router.get("/footer", async (req, res) => {
  try {
    const professions = await Profession.find({ showProfession: true });

    res.status(200).json({
      professions: professions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== GET LOCATION FILTERS (from Asms.js) ===========
router.get("/smslocums", async (req, res) => {
  Locum.paginate({}, {}).then(async (result) => {
    console.log(req.query);

    let match = { SMStext: true, country: "Australia", isLocum: true };

    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    // Professions = OK
    if (req.query.profession !== "") {
      const breakProfs = req.query.profession;
      match["profession"] = breakProfs;
    }

    const noOfSubscribers = await Locum.find(match).countDocuments();

    // const professions = await Locum.find(match)

    console.log(match, "match");
    try {
      res.status(200).json({
        noOfSubscribers: noOfSubscribers,
        // professions: professions,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======= GET PROFESSIONS IN SMS (from Asms.js) =========
router.get("/smsProfessions", async (req, res) => {
  try {
    const professions = await Profession.find({
      showProfession: true,
    }).sort({ professionName: "asc" });

    res.status(200).json({
      professions: professions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//======= GET PROFESSIONS IN PERSONAL DETAILS (From Aedituser.js) =========
router.get("/listOfProfessions", async (req, res) => {
  try {
    const professions = await Profession.find({
      showProfession: true,
    }).sort({ professionName: "asc" });

    res.status(200).json({
      professions: professions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============= UNDELETE IN EDIT ================
router.put("/undelete/:slug", async (req, res) => {
  try {
    // Listings => Paused and Expired
    let set = {};
    set["isDeletedJob"] = req.body.isDeletedJob;
    set["isActiveJob"] = req.body.isActiveJob;
    set["isPaidLocum"] = false;

    const storedUser = await Listing.updateMany(
      { slug: req.params.slug },
      { $set: set }
    );

    // Applications => All rejected
    await Pub.updateMany(
      { caseId: req.body.caseId },
      { isRejected: true, isSelected: false }
    );

    res.json({
      storedUser: storedUser,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ============= UELETE IN EDIT ================
router.put("/delete/:slug", async (req, res) => {
  try {
    // Listings => Paused and Expired
    let set = {};
    set["isDeletedJob"] = req.body.isDeletedJob;
    set["isActiveJob"] = req.body.isActiveJob;
    set["isPaidLocum"] = false;

    const storedUser = await Listing.updateMany(
      { slug: req.params.slug },
      { $set: set }
    );

    // Applications => All rejected
    await Pub.updateMany(
      { caseId: req.body.caseId },
      { isRejected: true, isSelected: false }
    );

    res.json({
      storedUser: storedUser,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ HIRED LOCUMS (from Alocumlistings.js) ==============
router.get("/hired", async (req, res, next) => {
  try {
    let match = { isSelected: true, isRejected: false };

    const candidat = await Pub.find({
      isSelected: true,
      isRejected: false,
    });

    console.log(candidat);

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

//=========== GET EMPLOYER WHO HIRED LOCUM (from AocumAgreements.js) ============
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

module.exports = router;

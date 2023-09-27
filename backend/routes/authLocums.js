const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const generate = require("nanoid-generate");
const locumId = generate.numbers(7);
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv/config");

const rapid = require("eway-rapid");

const apiKey = process.env.API_KEY,
  password = process.env.API_PASSWORD,
  rapidEndpoint = "Sandbox"; // Use 'Production' when you go live

const generateInvoice = generate.numbers(6);

const { step1Validation, locumValidation } = require("../validation");

// Imports
const Locum = require("../models/locumModel");
const User = require("../models/userModel");
const Pub = require("../models/applicationModel");
const Profession = require("../models/professionModel");
const PaymentPlans = require("../models/paymentPlansModel");

const { uploadFile } = require("../../s3");

//==================== STEP 1 =================
router.post("/step1", async (req, res, next) => {
  try {
    const { error } = step1Validation(req.body);

    if (error)
      return res.status(400).json({ invalid: error.details[0].message });
    res.send(req.body);
  } catch (err) {
    res.status(400).json({ err });
  }
});

//==================== STEP 3 =================
router.put("/step3", async (req, res, next) => {
  try {
    // Check email if already exist in database
    const emailExist = await Locum.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({
        prompt:
          "You have registered already. If you believe there is an error, please contact Medclicker Customer Serivces Team.",
      });

    // Generate local timeone for MongoDB
    let dt = new Date();

    dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

    const locum = new Locum({
      locumId: "L" + locumId,
      nanoId: req.body.nanoId,
      isLocum: req.body.isLocum,
      email: req.body.email,
      profession: req.body.profession,
      phone: req.body.phone,
      ahpra: req.body.ahpra,
      driverslicense: req.body.driverslicense,
      streetNo: req.body.streetNo,
      street: req.body.street,
      suburb: req.body.suburb,
      postalCode: req.body.postalCode,
      state: req.body.state,
      country: req.body.country,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      workhistory: req.body.workhistory,
      resume: req.body.resume,
      honourTitle: req.body.honourTitle,
      honourAwards: req.body.honourAwards,
      skillOne: req.body.skillOne,
      skillOne1: req.body.skillOne1,
      skillOne2: req.body.skillOne2,
      skillOne3: req.body.skillOne3,
      skillProf1: req.body.skillProf1,
      skillProf2: req.body.skillProf2,
      skillProf3: req.body.skillProf3,
      skillTwo: req.body.skillTwo,
      skillTwo1: req.body.skillTwo1,
      skillTwo2: req.body.skillTwo2,
      skillTwo3: req.body.skillTwo3,
      skillComp1: req.body.skillComp1,
      skillComp2: req.body.skillComp2,
      skillComp3: req.body.skillComp3,
      skillThree: req.body.skillThree,
      skillThree1: req.body.skillThree1,
      skillThree2: req.body.skillThree2,
      skillThree3: req.body.skillThree3,
      skillPharma1: req.body.skillPharma1,
      skillPharma2: req.body.skillPharma2,
      skillPharma3: req.body.skillPharma3,
      education: req.body.education,
      degree1: req.body.degree1,
      university1: req.body.university1,
      start1: req.body.start1,
      finish1: req.body.finish1,
      degree2: req.body.degree2,
      university2: req.body.university2,
      start2: req.body.start2,
      finish2: req.body.finish2,
      degree3: req.body.degree3,
      university3: req.body.university3,
      start3: req.body.start3,
      finish3: req.body.finish3,
      languages: req.body.languages,
      whichlanguage0: req.body.whichlanguage0,
      whichlanguage1: req.body.whichlanguage1,
      whichlanguage2: req.body.whichlanguage2,
      languageLvl0: req.body.languageLvl0,
      languageLvl1: req.body.languageLvl1,
      languageLvl2: req.body.languageLvl2,
      activeButton: req.body.activeButton,
      row: req.body.row,
      createdAt: dt,
    });

    //add in users database
    User.findByIdAndUpdate(req.body._id, req.body).then(function () {
      User.updateOne({ isLocum: req.body.isLocum });
    });
    const storedLocum = await locum.save();

    res.send(storedLocum);
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ GET LOCUM PROFILE (from Resume.js) ==============
router.get("/profileResume/:email", async (req, res) => {
  try {
    const user = await Locum.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ USER GET LOCUM (from LocumProfile.js and LocumCV.js) ==============
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await Locum.findOne({ email: req.params.email });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ DELETE PHOTO ==============
router.delete("/allusers/:id", async (req, res, next) => {
  let unset = {};
  unset["filename"] = null;

  const deleted = await Locum.updateOne(
    { _id: req.params.id },
    { $unset: unset }
  );
  res.status(204).json(deleted);
});

//============ UPLOAD IMAGES ==============

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./frontend/public/locumPhoto/",
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
}).single("gameFile");

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
  upload(req, res, async (err) => {
    const email = req.query.email;
    const user = await Locum.findOne({ email });

    if (req.file === undefined) {
      res.redirect(process.env.FRONTEND_URL + "locum_profile");
    } else {
      const result = await uploadFile(req.file);
      await unlinkFile(req.file.path);

      let set = {};
      set["photo"] = req.file.filename;

      await Pub.updateMany({ email: req.query.email }, { $set: set });

      Locum.findByIdAndUpdate(user._id, {
        filename: result.Location,
      }).then(function () {
        Locum.findOne({ email: req.query.email }).then(function (storedLocum) {
          storedLocum.save(() => {
            res.redirect(process.env.FRONTEND_URL + "locum_profile");
          });
        });
      });
    }
  });
});

// ======= UPDATE LOCUM PROFILE (from LocumProfile.js) ========
router.put("/updateProfile", async (req, res, next) => {
  const { error } = locumValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  //   let set = {};
  //   set["firstName"] = req.body.firstName;
  //   set["lastName"] = req.body.lastName;
  //   set["photo"] = req.body.photo;

  //   await Pub.updateMany({ nanoId: req.body.nanoId }, { $set: set });

  Locum.findByIdAndUpdate(req.body._id, req.body).then(function () {
    Locum.findById({ _id: req.body._id }).then(function (storedUser) {
      storedUser.save();
      res.send(storedUser);
    });
  });
});

// ===== UPDATE LOCUM SKILLS & EXPERIENCES (from LocumCV.js) =====
router.put("/updateCv", async (req, res, next) => {
  Locum.findByIdAndUpdate(req.body._id, req.body).then(function () {
    Locum.findById({ _id: req.body._id }).then(function (storedUser) {
      storedUser.save();
      res.send(storedUser);
    });
  });
});

// ============== PREVIEW CV (from Resume.js) ===============
router.get("/resume/:locumId", async (req, res) => {
  const locum = await Locum.findOne({ locumId: req.params.locumId });

  if (locum === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "resume/" + req.params.locumId);
  }
});

// ============== PREVIEW CV (from Applicationmanager.js) ===============
router.get("/resumeMe/:nanoId", async (req, res) => {
  const locum = await Locum.findOne({ nanoId: req.params.nanoId });

  if (locum === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "resume/" + req.params.nanoId);
  }
});

//========= GET LOCUM PROFILE (from ad-details.js) ===========
router.get("/candidate/:email", async (req, res) => {
  try {
    const user = await Locum.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET LOCUM PROFILE (from resumeCandidate.js) ==============
router.get("/applicant/:nanoId", async (req, res) => {
  try {
    const applicant = await Locum.findOne({ nanoId: req.params.nanoId });

    res.status(200).json(applicant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//================ VIEW RESUME ======================
// (from listingmanager.js )
router.get("/resumeCandidate/:nanoId/:slug", async (req, res) => {
  const locum = await Locum.findOne({ nanoId: req.params.nanoId });

  let set = {};
  set["seen"] = true;
  const nanoslug = req.params.nanoId + req.params.slug;

  await Pub.updateOne({ nanoslug: nanoslug }, { $set: set });

  if (locum === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "resumeCandidate/" + req.params.nanoId
    );
  }
});

//============ GET LOCUM FILTERS ==============
router.get("/database", async (req, res) => {
  Locum.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = { isLocum: true, showLocum: true };

    // Language Type
    if (req.query.language !== "") {
      const breakLanguage = req.query.language;
      const languageArr = breakLanguage.split(",");

      if (languageArr) {
        language1 = languageArr;
        language2 = languageArr;
        language3 = languageArr;
        const taal1 = { whichlanguage0: language1 };
        const taal2 = { whichlanguage1: language2 };
        const taal3 = { whichlanguage2: language3 };
        let tl = [taal1, taal2, taal3];
        match["$or"] = tl;
      }
    }

    // Professions = OK
    if (req.query.professions !== "") {
      const breakProfs = req.query.professions;
      const profArr = breakProfs.split(",");
      match["profession"] = profArr;
    }

    // Location (STATE)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    console.log(match, "match");

    const num = await Locum.find(match).countDocuments();

    const professions = await Profession.find({
      showProfession: true,
      contractType: "Locum",
    });

    let perPage = 12;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const locums = await Locum.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        locums: locums,
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

//========== GET LIST OF PROFESSIONS (from step1.js) ============
router.get("/listOfProfessions", async (req, res) => {
  try {
    const professions = await Profession.find({
      showProfession: true,
      contractType: "Locum",
    });
    res.status(200).json({
      professions: professions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//================ BOOK ME ======================
// (from listingmanager.js )
router.post("/bookme/:nanoId/:slug", async (req, res) => {
  const nanoslug = req.params.nanoId + req.params.slug;

  const candidate = await Pub.findOne({ nanoslug: nanoslug });

  const user = await User.findOne({ email: req.body.email });

  const plans = await PaymentPlans.findOne({ isAdmin: true });

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

  var totale = null;
  // LOCUM PLAN 1
  if (noDays >= plans.locumMin1 && noDays < plans.locumMin2) {
    if (plans.locumDiscount1 || plans.locumDiscount1 !== "") {
      const dis = parseFloat(plans.locumDiscount1).toFixed(2);
      totale = parseFloat(plans.locumFee1 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee1 * 100);
    }
  }

  // LOCUM PLAN 2
  if (noDays >= plans.locumMin2 && noDays < plans.locumMin3) {
    if (plans.locumDiscount2 || plans.locumDiscount2 !== "") {
      const dis = parseFloat(plans.locumDiscount2).toFixed(2);
      totale = parseFloat(plans.locumFee2 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee2 * 100);
    }
  }

  // LOCUM PLAN 3
  if (noDays >= plans.locumMin3 && noDays < plans.locumMin4) {
    if (plans.locumDiscount3 || plans.locumDiscount3 !== "") {
      const dis = parseFloat(plans.locumDiscount3).toFixed(2);
      totale = parseFloat(plans.locumFee3 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee3 * 100);
    }
  }
  // LOCUM PLAN 4
  if (noDays >= plans.locumMin4 && noDays < plans.locumMin5) {
    if (plans.locumDiscount4 || plans.locumDiscount4 !== "") {
      const dis = parseFloat(plans.locumDiscount4).toFixed(2);
      totale = parseFloat(plans.locumFee4 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee4 * 100);
    }
  }

  // LOCUM PLAN 5
  if (noDays >= plans.locumMin5 && noDays < plans.locumMin6) {
    if (plans.locumDiscount5 || plans.locumDiscount5 !== "") {
      const dis = parseFloat(plans.locumDiscount5).toFixed(2);
      totale = parseFloat(plans.locumFee5 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee5 * 100);
    }
  }

  // LOCUM PLAN 6
  if (noDays >= plans.locumMin6 && noDays < plans.locumMin7) {
    if (plans.locumDiscount6 || plans.locumDiscount6 !== "") {
      const dis = parseFloat(plans.locumDiscount6).toFixed(2);
      totale = parseFloat(plans.locumFee6 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee6 * 100);
    }
  }
  // LOCUM PLAN 7
  if (noDays >= plans.locumMin7 && noDays < plans.locumMin8) {
    if (plans.locumDiscount7 || plans.locumDiscount7 !== "") {
      const dis = parseFloat(plans.locumDiscount7).toFixed(2);
      totale = parseFloat(plans.locumFee7 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee7 * 100);
    }
  }
  // LOCUM PLAN 8
  if (noDays >= plans.locumMin8 && noDays < plans.locumMin9) {
    if (plans.locumDiscount8 || plans.locumDiscount8 !== "") {
      const dis = parseFloat(plans.locumDiscount8).toFixed(2);
      totale = parseFloat(plans.locumFee8 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee8 * 100);
    }
  }

  // LOCUM PLAN 9
  if (noDays >= plans.locumMin9 && noDays < plans.locumMax9) {
    if (plans.locumDiscount9 || plans.locumDiscount9 !== "") {
      const dis = parseFloat(plans.locumDiscount9).toFixed(2);
      totale = parseFloat(plans.locumFee9 * 100) * (1 - dis / 100);
    } else {
      totale = parseFloat(plans.locumFee9 * 100);
    }
  }

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
            SKU: "Locum",
            Quantity: 1,
            Total: totale,
          },
        ],
        Payment: {
          CurrencyCode: "AUD",
          TotalAmount: totale,
          InvoiceNumber: "INV" + generateInvoice + user.state,
          InvoiceDescription: "Locum",
          InvoiceReference: generateInvoice,
        },
        RedirectUrl: process.env.FRONTEND_URL + "payment_loading/" + nanoslug,
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
        });
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============= EMPLOYER VIEW LOCUM =================
router.get("/isSelected/:nanoId/:slug", async (req, res) => {
  const locum = await Locum.findOne({ nanoId: req.params.nanoId });

  let set = {};
  set["seen"] = true;
  const nanoslug = req.params.nanoId + req.params.slug;

  await Pub.updateOne({ nanoslug: nanoslug }, { $set: set });

  if (locum === null) {
    res.redirect(process.env.FRONTEND_URL);
  } else {
    res.redirect(process.env.FRONTEND_URL + "resume_selected/" + locum.locumId);
  }
});



module.exports = router;

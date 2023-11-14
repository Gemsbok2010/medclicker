const express = require("express");
const router = express.Router();
const moment = require("moment");
const generate = require("nanoid-generate");
const generateCaseId = generate.numbers(3);
const cron = require("node-cron");
require("dotenv/config");

// Imports
const Listing = require("../models/listingModel");
const Profession = require("../models/professionModel");
const Pub = require("../models/applicationModel");
const User = require("../models/userModel");

const {
  question4Validation,
  question5Validation,
  question6Validation,
  listingEditValidation,
} = require("../validation");

// ======== CRON JOB - Schedule tasks to be run on the server ======== //.
cron.schedule(
  "10 0 * * *",
  async () => {
    let today = new Date();
    today = today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    let match = {};
    match["expiryDate"] = { $lt: today };

    let set = {};
    set["isDeletedJob"] = true;
    set["isActiveJob"] = false;

    await Listing.updateMany(match, { $set: set });

    console.log(`cron performed on Listing ${today}`);
  },
  {
    scheduled: true,
    timezone: "Australia/Sydney",
  }
);

//============ GET PROFESSIONS IN QUESTION 2 ==============
router.get("/question2", async (req, res) => {
  Profession.paginate({}, {}).then(async (result) => {
    const num = await Profession.find({
      showProfession: true,
      contractType: req.query.contract,
    }).countDocuments();

    let perPage = 7;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    try {
      const professions = await Profession.find({
        showProfession: true,
        contractType: req.query.contract,
      })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ professionName: "asc" });

      res.status(200).json({
        professions: professions,
        maxPage: maxPage,
        page: page,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//============ UPDATE IN QUESTION 4 ==============
router.put("/question4", async (req, res, next) => {
  const { error } = question4Validation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });
  res.send(req.body);
});

//============ UPDATE IN QUESTION 5 ==============
router.put("/question5", async (req, res, next) => {
  const { error } = question5Validation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });
  res.send(req.body);
});

//============ UPDATE IN QUESTION 6 ==============
router.put("/question6", async (req, res, next) => {
  let todaysDate = moment().format("DD MMM YYYY");

  const { error } = question6Validation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });
  req.body.todaysDate = todaysDate;
  res.send(req.body);
});

//======= SUBMIT IN QUESTION LOCUM REVIEW (From QuestionLocumReview.js) =======
router.post("/locumList", async (req, res, next) => {
  let dt = new Date();
  const jaar = dt.getFullYear();
  const dag = dt.getDate();

  const storeExp = new Date(req.query.expiryDate);

  storeExp.setDate(storeExp.getDate() + 1);

  const user = await User.findOne({ email: req.body.email });

  // Generate local timeone for MongoDB
  dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

  const list = new Listing({
    caseId: req.body.state + `${jaar}${dag}` + generateCaseId,
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
    startDate: req.body.startDate,
    finishDate: req.body.finishDate,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
    monStart: req.body.monStart,
    tueStart: req.body.tueStart,
    wedStart: req.body.wedStart,
    thuStart: req.body.thuStart,
    friStart: req.body.friStart,
    satStart: req.body.satStart,
    sunStart: req.body.sunStart,
    monFinish: req.body.monFinish,
    tueFinish: req.body.tueFinish,
    wedFinish: req.body.wedFinish,
    thuFinish: req.body.thuFinish,
    friFinish: req.body.friFinish,
    satFinish: req.body.satFinish,
    sunFinish: req.body.sunFinish,
    normal_rate: req.body.normal_rate,
    sat_rate: req.body.sat_rate,
    sun_rate: req.body.sun_rate,
    ph_rate: req.body.ph_rate,
    airtravel: req.body.airtravel,
    airport: req.body.airport,
    roadtravel: req.body.roadtravel,
    accommodation: req.body.accommodation,
    payout: req.body.payout,
    monHr: req.body.monHr,
    tueHr: req.body.tueHr,
    wedHr: req.body.wedHr,
    thuHr: req.body.thuHr,
    friHr: req.body.friHr,
    satHr: req.body.satHr,
    sunHr: req.body.sunHr,
    // standard
    filename: req.body.filename,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: user.phone,
    expiryDate: storeExp,
    createdAt: dt,
  });

  try {
    const storedList = await list.save();
    res.send(storedList);
  } catch (err) {
    res.redirect(process.env.FRONTEND_URL + "dashboard");
  }
});

//========== GET SEARCH FILTERS (From Searchlist.js) ============
router.get("/search", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let locatie = req.query.location;

    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }
    let match = {
      isActiveJob: true,
      isDeletedJob: false,
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

    // Professions
    if (req.query.professions) {
      const breakProfessions = req.query.professions;
      const professionArr = breakProfessions.split(",");
      const ans = { professions: professionArr };

      let professions = [];
      if (professionArr) {
        professions = professionArr;
        match["professions"] = professions;
      }
    }

    // Location (STATE)
    if (req.query.location) {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");

      let location = [];

      if (stateArr) {
        location = stateArr;

        const ans2 = { state: stateArr };
        let od = [ans2];
        match["$or"] = od;
      }
    }
    // Location (STATE ONLY)
    if (req.query.location) {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
    }

    const num = await Listing.find(match).countDocuments();
    const professions = await Profession.find({ showProfession: true });

    let perPage = 6;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      // GET LONGITUDE AND LATITUDE
      let longArr = [];

      for (var i = 0; i < adPosts.length; i++) {
        var results = adPosts[i].longitude;
        longArr.push(results);
      }

      let latArr = [];

      for (var j = 0; j < adPosts.length; j++) {
        var posts = adPosts[j].latitude;
        latArr.push(posts);
      }

      res.status(200).json({
        adPosts: adPosts,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        professions: professions,
        longArr: longArr,
        latArr: latArr,
        location: locatie,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//=========== VIEW OR REDIRECT TO AD DETAILS ============
// (from searchlist.js and applicationsManager.js)
//View by Slug Number page
router.get("/adPosts/:slug", async (req, res) => {
  const post = await Listing.findOne({ slug: req.params.slug });

  if (post.contractType === "Locum") {
    res.redirect(process.env.FRONTEND_URL + "Ad_details/" + req.params.slug);
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "Ad_details_std/" + req.params.slug
    );
  }
});

//=========== GET AD DETAILS ============
// (from searchlist.js, applicationsManager.js and listingEdit.js)
//View by Slug Number page
router.get("/Ad_details/:slug", async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });

    const today = new Date();

    const storedStartDate = listing.startDate;
    const storedFinishDate = listing.finishDate;
    const day = storedStartDate.split(" ")[0];
    const mth = storedStartDate.split(" ")[1];
    const year = storedStartDate.split(" ")[2];

    const dag = storedFinishDate.split(" ")[0];
    const mnd = storedFinishDate.split(" ")[1];
    const jaar = storedFinishDate.split(" ")[2];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months.indexOf(mth);
    const maand = months.indexOf(mnd);
    const startDateInCode = new Date(year, month, day);
    const finishDateInCode = new Date(jaar, maand, dag);

    res.status(200).json({
      listing: listing,
      startDateInCode: startDateInCode,
      finishDateInCode: finishDateInCode,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== GET AD DETAILS STD ============
// (from Ad_details_std.js)
//View by Slug Number page
router.get("/Ad_details_std/:slug", async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });

    res.status(200).json({
      listing: listing,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//=========== GET AD DETAILS ============
// (from searchlist.js and applicationsManager.js)
//View by Slug Number page
router.get("/listingEditReg/:slug", async (req, res) => {
  try {
    const listing = await Listing.findOne({ slug: req.params.slug });

    res.status(200).json({
      listing: listing,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//============ GET LISTINGMANAGER.JS ==============
router.get("/listingmanager", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    const email = req.query.email;
    let match = { email: email, isDeletedJob: false };
    let Cmatch = { isRejected: false, slugId: req.query.slug };

    // Contract Type
    if (req.query.contract !== "") {
      const breakContract = req.query.contract;
      const contractArr = breakContract.split(",");
      const ans = { contract: contractArr };
      let contract = [];
      if (contractArr) {
        contract = contractArr;
        match["contractType"] = contract;
        Cmatch["contractType"] = contract;
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
        Cmatch["professions"] = professions;
      }
    }

    // Location (STATE )
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");

      let location = [];
      if (stateArr) {
        location = stateArr;
        const ans = { state: stateArr };
        od = [ans];
        match["$or"] = od;
        Cmatch["$or"] = od;
      }
    }
    // Location (STATE ONLY)
    if (req.query.location !== "") {
      const breakLocation = req.query.location;
      const stateArr = breakLocation.split(",");
      match["state"] = stateArr;
      Cmatch["state"] = stateArr;
    }

    const num = await Listing.find(match).countDocuments();

    const professions = await Profession.find({ showProfession: true });

    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    console.log(match, "match");
    try {
      const adPosts = await Listing.find(match)
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      const candidates = await Pub.find(Cmatch).sort({ createdAt: sort });

      const candidat = await Listing.find({
        email: email,
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

      const noApplied = await Pub.find({
        slugId: slugArr,
        isRejected: false,
      }).countDocuments();

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
        noApplied: noApplied,
        num: num,
        page: page,
        maxPage: maxPage,
        sort: sort,
        newApplicants: newApplicants,
        professions: professions,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

// Candidates Slug Number (from listingManager.ejs)
router.get("/candidates", async (req, res) => {
  Listing.paginate({}, {}).then(async (result) => {
    let sort = req.query.sortBy;
    if (sort === undefined || sort === "") {
      sort = -1;
    }

    let match = {};
    const email = req.query.email;
    match = { email: email, isDeletedJob: false };

    // Contract Type
    if (req.query.contract !== "" || req.query.contract !== undefined) {
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
    if (req.query.professions !== "" || req.query.professions !== undefined) {
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

    const professions = await Profession.find({ showProfession: true });
    const num = await Listing.find({
      email: email,
      isDeletedJob: false,
    }).countDocuments();

    // MAKE AS SEEN: TRUE WHEN JUST APPLICANT BUTTON IS CLICKED
    if (
      req.query.contract === "Full-Time" ||
      req.query.contract === "Part-Time"
    ) {
      let set = {};
      set["seen"] = true;
      await Pub.updateMany({ slugId: req.query.slug }, { $set: set });
    }

    let totalItems = result.totalDocs;
    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    try {
      const adPosts = await Listing.find({ email, isDeletedJob: false })
        .sort({ createdAt: sort })
        .skip((page - 1) * perPage)
        .limit(perPage);

      const candidates = await Pub.find({
        slugId: req.query.slug,
        isRejected: false,
      }).sort({ createdAt: "desc" });

      const noApplied = await Pub.find({
        slugId: req.query.slug,
        isRejected: false,
      }).countDocuments();

      res.status(200).json({
        adPosts: adPosts,
        candidates: candidates,
        noApplied: noApplied,
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

// Candidates Slug Number (from listingManager.ejs)
router.put("/sleepAd/:slug", async (req, res) => {
  const user = await Listing.findOne({ slug: req.params.slug });
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }

  const num = await Listing.find({
    isActiveJob: req.body.isActiveJob,
    isDeletedJob: false,
    slug: req.params.slug,
  }).countDocuments();

  let perPage = 10;
  let maxPage = Math.ceil(num / perPage);
  const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;
  try {
    const storedUser = await Listing.updateOne(
      { slug: req.params.slug },
      { isActiveJob: req.body.isActiveJob }
    );
    let adPosts = await Listing.find({
      email: user.email,
      isDeletedJob: false,
    }).sort({
      createdAt: sort,
    });

    res.send({
      storedUser: storedUser,
      adPosts: adPosts,
      sort: sort,
      maxPage: maxPage,
      page: page,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//=========== EDIT AD DETAILS ============
//Edit Slug Number page (from listingManager.ejs)
router.get("/edit/:slug", async (req, res) => {
  const post = await Listing.findOne({ slug: req.params.slug });
  if (post.contractType === "Locum") {
    res.redirect(process.env.FRONTEND_URL + "ListingEdit/" + req.params.slug);
  } else {
    res.redirect(
      process.env.FRONTEND_URL + "listingEditReg/" + req.params.slug
    );
  }
});

// ============= DELETE IN EDIT ================
router.put("/delete/:slug", async (req, res) => {
  try {
    // Listings => Paused and Expired
    let set = {};
    set["isDeletedJob"] = req.body.isDeletedJob;
    set["isActiveJob"] = req.body.isActiveJob;

    const storedUser = await Listing.updateMany(
      { slug: req.params.slug },
      { $set: set }
    );

    // Applications => All rejected
    await Pub.updateMany({ caseId: req.body.caseId }, { isRejected: true });

    res.json({
      storedUser: storedUser,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ============= REJECT CANDIDATE ================
router.put("/reject/:slug/:nanoId", async (req, res) => {
  let sort = req.query.sortBy;
  if (sort === undefined || sort === "") {
    sort = -1;
  }
  try {
    const nanoslug = req.params.nanoId + req.params.slug;

    const num = await Listing.find({
      nanoId: req.params.nanoId,
      isRejected: false,
    }).countDocuments();

    let perPage = 10;
    let maxPage = Math.ceil(num / perPage);
    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    const rejected = await Pub.updateOne(
      { nanoslug: nanoslug },
      { isRejected: true }
    );

    const candidat = await Listing.find({
      nanoId: req.params.nanoId,
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

    const candidates = await Pub.find({
      slugId: req.params.slug,
      isRejected: false,
    }).sort({ createdAt: sort });

    res.send({
      candidates: candidates,
      newApplicants: newApplicants,
      rejected: rejected,
      maxPage: maxPage,
      page: page,
      sort: sort,
    });
  } catch (err) {
    res.status(400).json({ err });
  }

  // const rejected = await Pub.deleteOne({ nanoslug: nanoslug });
  // res.send(rejected);
});

// ============= UPDATE IN EDIT ================
router.put("/edit", async (req, res, next) => {
  const { error } = listingEditValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  Listing.findByIdAndUpdate(req.body.slug, req.body).then(function (
    storedUser
  ) {
    res.send(storedUser);
  });
});

//============ GET PROFESSIONS IN HOMEPAGE (From Home.js) ==============
router.get("/homenavlist", async (req, res) => {
  Profession.paginate({}, {}).then(async (result) => {
    const num = await Profession.find({
      showProfession: true,
      contractType: req.query.contract,
    }).countDocuments();

    let perPage = 7;
    let maxPage = Math.ceil(num / perPage);

    const page = req.query.page && num > perPage ? parseInt(req.query.page) : 1;

    try {
      const professions = await Profession.find({
        showProfession: true,
        contractType: req.query.contract,
      })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ professionName: "asc" });

      res.status(200).json({
        professions: professions,
        maxPage: maxPage,
        page: page,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//======= GET PROFESSIONS IN PERSONAL DETAILS (From PersonalDetails.js) =========
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

module.exports = router;

const express = require("express");
const router = express.Router();

// Imports
const User = require("../models/userModel");
const Pub = require("../models/applicationModel");
const Listing = require("../models/listingModel");
const Locum = require("../models/locumModel");

const { smValidation } = require("../validation");

//=========== GET LOCUM PROFILE (from Dashboard.js) ===========
router.get("/dashboard/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    const { error } = await smValidation({
      firstName: user.firstName,
      email: req.params.email,
    });

    const total = await Locum.find({ showLocum: true }).countDocuments();

    const locum = await Locum.findOne({ email: req.params.email });

    const num = await Listing.find({
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const mylistings = await Listing.find({
      email: req.params.email,
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const candidat = await Listing.find({
      email: req.params.email,
      isActiveJob: true,
      isDeletedJob: false,
    });

    let slugArr = [];
    for (var i = 0; i < candidat.length; i++) {
      var results = candidat[i].slug;
      slugArr.push(results);
    }

    const applicants = await Pub.find({
      slugId: slugArr,
    }).countDocuments();

    const newApply = await Pub.find({
      seen: false,
      slugId: slugArr,
    }).countDocuments();

    const who = await User.find({ email: req.params.email });

    let state;
    if (who.length !== 0) {
      state = who[0].state;
    } else {
      state = "NSW";
    }

    const nsw = await Listing.find({
      state: ["NSW", "ACT"],
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const vic = await Listing.find({
      state: "VIC",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const qld = await Listing.find({
      state: "QLD",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const wa = await Listing.find({
      state: "WA",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const sa = await Listing.find({
      state: "SA",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const nt = await Listing.find({
      state: "NT",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const tas = await Listing.find({
      state: "TAS",
      isActiveJob: true,
      isDeletedJob: false,
    }).countDocuments();

    const applied = await Pub.find({
      email: req.params.email,
    }).countDocuments();

    const seen = await Pub.find({
      seen: true,
      email: req.params.email,
    }).countDocuments();

    res.status(200).json({
      user: user,
      locum: locum,
      total: total,
      num: num,
      mylistings: mylistings,
      applicants: applicants,
      newApply: newApply,
      error: error,
      applied: applied,
      seen: seen,
      nsw: nsw,
      vic: vic,
      qld: qld,
      sa: sa,
      wa: wa,
      tas: tas,
      nt: nt,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ========== HIDE ME AS LOCUM (From dashboard.js) ==========
router.put("/hideme/:id", async (req, res) => {
  const locum = await Locum.findOne({ locumId: req.params.id });

  try {
    // New data (from req.body) to database
    Locum.findByIdAndUpdate(locum._id, req.body).then(function () {
      Locum.findOne(locum._id).then(function (storedUser) {
        Locum.find({ showLocum: true })
          .countDocuments()
          .then(function (num) {
            res.send({ storedUser: storedUser, num: num });
          });
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

// Imports
const PaymentPlans = require("../models/paymentPlansModel");

//========== SUBMIT LOCUM PLANS (from ApaymentConsole.js) ==========
router.put("/plans", async (req, res, next) => {
  try {
    if (req.body._id !== "") {
      req.body.freeDays === null || req.body.freeDays === ""
        ? (req.body.freeDays = 30)
        : req.body.freeDays;
      console.log(req.body.freeDays);
      PaymentPlans.findByIdAndUpdate(req.body._id, req.body).then(function () {
        PaymentPlans.findById(req.body._id).then(function (savedPlan) {
          savedPlan.save();
          res.send(savedPlan);
        });
      });
    } else {
      // Generate local timeone for MongoDB
      let dt = new Date();
      dt = dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

      const payment = new PaymentPlans({
        createdAt: dt,
        freeDays: req.body.freeDays,
        expDays1: req.body.expDays1,
        expDays2: req.body.expDays2,
        expDays3: req.body.expDays3,
        regFee1: req.body.regFee1,
        regFee2: req.body.regFee2,
        regFee3: req.body.regFee3,
        regDiscount1: req.body.regDiscount1,
        regDiscount3: req.body.regDiscount2,
        regDiscount3: req.body.regDiscount3,
        regPlan1: req.body.regPlan1,
        regPlan2: req.body.regPlan2,
        regPlan3: req.body.regPlan3,
        socialMed1: req.body.socialMed1,
        socialMed2: req.body.socialMed2,
        socialMed3: req.body.socialMed3,
        newsletter1: req.body.newsletter1,
        newsletter2: req.body.newsletter2,
        newsletter3: req.body.newsletter3,
        locumMin1: req.body.locumMin1,
        locumMax1: req.body.locumMax1,
        locumFee1: req.body.locumFee1,
        locumDiscount1: req.body.locumDiscount1,
        locumMin2: req.body.locumMin2,
        locumMax2: req.body.locumMax2,
        locumFee2: req.body.locumFee2,
        locumDiscount2: req.body.locumDiscount2,
        locumMin3: req.body.locumMin3,
        locumMax3: req.body.locumMax3,
        locumFee3: req.body.locumFee3,
        locumDiscount3: req.body.locumDiscount3,
        locumMin4: req.body.locumMin4,
        locumMax4: req.body.locumMax4,
        locumFee4: req.body.locumFee4,
        locumDiscount4: req.body.locumDiscount4,
        locumMin5: req.body.locumMin5,
        locumMax5: req.body.locumMax5,
        locumFee5: req.body.locumFee5,
        locumDiscount5: req.body.locumDiscount5,
        locumMin6: req.body.locumMin6,
        locumMax6: req.body.locumMax6,
        locumFee6: req.body.locumFee6,
        locumDiscount6: req.body.locumDiscount6,
        locumMin7: req.body.locumMin7,
        locumMax7: req.body.locumMax7,
        locumFee7: req.body.locumFee7,
        locumDiscount7: req.body.locumDiscount7,
        locumMin8: req.body.locumMin8,
        locumMax8: req.body.locumMax8,
        locumFee8: req.body.locumFee8,
        locumDiscount8: req.body.locumDiscount8,
        locumMin9: req.body.locumMin9,
        locumMax9: req.body.locumMax9,
        locumFee9: req.body.locumFee9,
        locumDiscount9: req.body.locumDiscount9,
        isAdmin: req.body.isAdmin,
        setRegularPayment: req.body.setRegularPayment,
        locumPayment: req.body.locumPayment,
      });
      const savedPlan = await payment.save();
      console.log(savedPlan);
      res.send(savedPlan);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

//========== GET PAYMENT PLANS DATA (from ApaymentConsole.js) =========
router.get("/paymentPlans", async (req, res) => {
  try {
    const plans = await PaymentPlans.findOne({ isAdmin: true });

    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
});

//========== GET PAYMENT PLANS DATA (from ApaymentConsole.js) =========
router.get("/storedPlans", async (req, res) => {
  try {
    const plans = await PaymentPlans.findOne({ isAdmin: true });

    const startDate = new Date();

    const mth = startDate.toString().split(" ")[1];
    const day = startDate.toString().split(" ")[2];
    const year = startDate.toString().split(" ")[3];
    const start = `${day} ${mth} ${year}`;

    const finishDate1 = new Date();
    finishDate1.setDate(finishDate1.getDate() + plans.expDays1);

    const mth1 = finishDate1.toString().split(" ")[1];
    const day1 = finishDate1.toString().split(" ")[2];
    const year1 = finishDate1.toString().split(" ")[3];
    const finish1 = `${day1} ${mth1} ${year1}`;

    const finishDate2 = new Date();
    finishDate2.setDate(finishDate2.getDate() + plans.expDays2);

    const mth2 = finishDate2.toString().split(" ")[1];
    const day2 = finishDate2.toString().split(" ")[2];
    const year2 = finishDate2.toString().split(" ")[3];
    const finish2 = `${day2} ${mth2} ${year2}`;

    const finishDate3 = new Date();
    finishDate3.setDate(finishDate3.getDate() + plans.expDays3);

    const mth3 = finishDate3.toString().split(" ")[1];
    const day3 = finishDate3.toString().split(" ")[2];
    const year3 = finishDate3.toString().split(" ")[3];
    const finish3 = `${day3} ${mth3} ${year3}`;

    res.status(200).json({
      plans: plans,
      start: start,
      finish1: finish1,
      finish2: finish2,
      finish3: finish3,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ======== ENABLE LOCUM PAYMENT SWITCH (from Apayments.js) =====
router.put("/enableLocum", async (req, res) => {
  try {
    const storedUser = await PaymentPlans.updateOne(
      { isAdmin: true },
      { locumPayment: req.body.locumPayment }
    );

    res.send({ storedUser: storedUser });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ======= ENABLE REGULAR PAYMENT SWITCH (from Apayments.js) =====
router.put("/enablePayment", async (req, res) => {
  try {
    PaymentPlans.findByIdAndUpdate(req.body._id, req.body).then(function () {
      PaymentPlans.findById(req.body._id).then(function (savedPlan) {
        savedPlan.save();
        res.send({ storedUser: savedPlan });
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;

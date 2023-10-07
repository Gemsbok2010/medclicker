const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { config } = require("../config");
const moment = require("moment");
require("dotenv/config");

// Imports
const User = require("../models/userModel");
const { passwordChange } = require("../validation");

const {
  informPasswordChangeEmail,
  sendPasswordChangedEmail,
  contactUsEmail,
  contactUsContent,
  forgotPasswordEmail,
  sendforgotPasswordEmail,
} = require("../emails/sendEmail");

// ========== CHANGE PASSWORD (from SecuritySettings.js) =======
router.put("/securitySettings/:_id", async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  //LETS VALIDATE THE DATA BEFORE
  const { error } = await passwordChange(req.body);

  if (error) return res.status(400).send({ invalid: error.details[0].message });

  const user = await User.findOne({ _id: req.params._id });

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // valid user

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");
  const firstName = user.firstName;
  const email = user.email;

  try {
    User.findByIdAndUpdate(user._id, req.body).then(function () {
      user.password = hashedPassword;
      user.save();

      informPasswordChangeEmail(firstName, logo, email, thisyear);
      const subject = "Medclicker Password Updated";
      const to = `${email}`;
      const from = {
        email: "info@medclicker.com.au",
        name: "Medclicker Customer Support",
      };
      sendPasswordChangedEmail(to, from, subject, output);
      res.json({ user });
    });
  } catch (error) {
    res.send(error.message);
  }
});

// =========== CONTACT US EMAIL =============
router.post("/sendmail", (req, res) => {
  const { name, phone, email, message } = req.body;

  const logo = "https://i.ibb.co/1KgVNwJ/medclicker.png";
  const thisyear = moment().format("YYYY");

  contactUsContent(name, phone, email, message, thisyear, logo);
  const subject = "Contact us From Customer";
  const to = {
    email: "info@medclicker.com.au",
  };
  const from = {
    email: "info@medclicker.com.au",
    name: "Contact us",
  };
  contactUsEmail(to, from, subject, output);
  res.send({ message: "OK" });
});

// ============ RESET PASSWORD =================
router.put("/resetpassword/:id/:token", async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;

  //LETS VALIDATE THE DATA BEFORE
  const { error } = await passwordChange(req.body);

  if (error) return res.status(400).send({ invalid: error.details[0].message });

  const user = await User.findById({ _id: req.params.id });

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

// ============ FORGOT PASSWORD =================
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  // Check email if already exist in database
  const user = await User.findOne({ email: req.body.email });

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

module.exports = router;

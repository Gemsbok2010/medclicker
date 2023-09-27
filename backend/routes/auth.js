const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../util");
const { signUpValidation, loginValidation } = require("../validation");
const generate = require("nanoid-generate");
const generateNanoId = generate.numbers(5);

//============ SIGN UP ==============
router.post("/signup", async (req, res) => {
  try {
    //LETS VALIDATE THE DATA BEFORE
    const { error } = signUpValidation(req.body);
    console.log(error);
    if (error)
      return res.status(400).json({ invalid: error.details[0].message });

    // Check email if already exist in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({
        prompt:
          "This <b>Email</b> address has already been registered. You may wish to try<a href='/forgotpassword'> Forgot Password?</a>",
      });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Generate local timeone for MongoDB
    let now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 11;
    const day = now.getDate() + 10;
    now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    const user = new User({
      nanoId: "M" + `${year}${month}${day}` + generateNanoId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      survey: "",
      profession: "",
      phone: "",
      country: "",
      password: hashedPassword,
      createdAt: now,
    });
    const savedUser = await user.save();

    const token = generateToken(savedUser);
    res.cookie("authToken", token, { httpOnly: false });

    res.send({ user: savedUser, token: token });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//=================== EMAIL LOGIN ================
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE
  const { error } = await loginValidation(req.body);

  if (error) return res.status(400).json({ invalid: error.details[0].message });

  // If no email exists in database
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      invalid:
        "Email or password incorrect. Please check your inputs and try again.",
    });
  }
  // If password is incorrect?
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      invalid:
        "Email or password incorrect. Please check your inputs and try again.",
    });

  if (!user) {
    res.status(400).json({
      invalid:
        "Email or password incorrect. Please check your inputs and try again.",
    });
  } else {
    const authToken = generateToken(user);
    res.cookie("authToken", authToken, { httpOnly: false });
    if (user.isAdmin) {
      const adminToken = generateToken(user);
      res.cookie("adminToken", adminToken, { httpOnly: false });
    }
    res.json({ user, authToken });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const url = require("url");
const fs = require("fs-extra");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
// const app = express();
// const fileUpload = require("express-fileupload");
// app.use(fileUpload());

// Imports
const User = require("../models/userModel");
const Listing = require("../models/listingModel");
const Locum = require("../models/locumModel");
const Pub = require("../models/applicationModel");

const { uploadFile } = require("../../s3");
const { detailsValidation } = require("../validation");
const { findById } = require("../models/paymentPlansModel");

//============ GET PERSONAL DETAILS PAGE ==============
router.get("/allusers/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//==================== UPDATE IN PERSONAL DETAILS =================
router.put("/allusers", async (req, res, next) => {
  try {
    const { error } = detailsValidation(req.body);

    if (error)
      return res.status(400).json({ invalid: error.details[0].message });

    const email = req.body.email;

    const locum = await Locum.findOne({ email });
    const user = await User.findOne({ email });

    if (locum) {
      let set = {};
      set["firstName"] = req.body.firstName;
      set["lastName"] = req.body.lastName;
      await Locum.updateOne({ nanoId: locum.nanoId }, { $set: set });
      await Pub.updateMany({ nanoId: locum.nanoId }, { $set: set });
    }
    let set = {};
    set["filename"] = req.body.filename;
    set["firstName"] = req.body.firstName;
    set["lastName"] = req.body.lastName;
    await Listing.updateMany({ email: email }, { $set: set });

    // New data (from req.body) to database
    User.findByIdAndUpdate(user._id, req.body).then(function () {
      User.findOne(user._id).then(function (storedUser) {
        storedUser.save();
        res.send(storedUser);
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//============ DELETE PHOTO ==============
router.delete("/allusers/:id", async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id });

  let unset = {};
  unset["filename"] = null;

  const deleted = await User.updateOne(
    { _id: req.params.id },
    { $unset: unset }
  );
  await Listing.updateMany({ email: user.email }, { $unset: unset });

  res.status(204).json(deleted);
});

//============ UPLOAD IMAGES ==============

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
        res.json({ invalid: "File not accepted." });
      } else {
        const result = await uploadFile(req.file);

        await unlinkFile(req.file.path);

        let set = {};
        set["filename"] = result.Location;
        await Listing.updateMany({ email: email }, { $set: set });

        User.findByIdAndUpdate(user._id, {
          filename: result.Location,
        })
          .then(function () {
            User.findOne({ email: req.query.email }).then(function (
              storedUser
            ) {
              storedUser.save(() => {
                res.json({ storedUser: storedUser, newImage: result.Location });
              });
            });
          })
          .catch((err) => res.json({ err }));
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});



module.exports = router;

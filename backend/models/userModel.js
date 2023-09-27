const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    nanoId: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    locumId: {
      type: String,
    },
    isLocum: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
      index: true,
      unique: true,
    },
    phone: {
      type: String,
    },

    filename: {
      type: String,
    },
    survey: {
      type: String,
    },
    profession: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    streetNo: {
      type: String,
    },
    street: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    suburb: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    password: {
      type: String,
      min: 8,
      max: 35,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    photos: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

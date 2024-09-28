const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const applicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      min: 2,
      max: 255,
    },
    resume: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    contractType: {
      type: String,
    },
    available_start: {
      type: String,
    },
    available_finish: {
      type: String,
    },
    dateApplied: {
      type: String,
    },
    dateAdListed: {
      type: String,
    },
    professions: {
      type: String,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    nanoId: {
      type: String,
    },
    locumId: {
      type: String,
    },
    ahpra: {
      type: String,
    },
    workstatus: {
      type: String,
    },
    locum_ahpra: {
      type: String,
    },
    locum_payroll: {
      type: String,
    },
    locum_airport: {
      type: String,
    },
    normal_rate: {
      type: String,
    },
    sat_rate: {
      type: String,
    },
    sun_rate: {
      type: String,
    },
    ph_rate: {
      type: String,
    },
    airport: {
      type: String,
    },
    airtravel: {
      type: Boolean,
    },
    accommodation: {
      type: Boolean,
    },
    roadtravel: {
      type: Boolean,
    },
    slugId: {
      type: String,
    },
    nanoslug: {
      type: String,
    },
    caseId: {
      type: String,
    },
    isLocum: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    locum_startDate: {
      type: Date,
    },
    locum_finishDate: {
      type: Date,
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
    suburb: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    expiryOffer: {
      type: Date,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

applicationSchema.plugin(mongoosePaginate);

const applicationModel = mongoose.model("applications", applicationSchema);
module.exports = applicationModel;

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const paymentSchema = new mongoose.Schema(
  {
    isPaidLocum: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    totalAmount: {
      type: Number,
      default: null,
    },
    gst: {
      type: Number,
      default: null,
    },
    invoiceNumber: {
      type: String,
    },
    dateIssued: {
      type: String,
    },
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
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    caseId: {
      type: String,
    },
    contractType: {
      type: String,
    },
    professions: {
      type: String,
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
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    jobSeekerFirstName: {
      type: String,
    },
    jobSeekerLastName: {
      type: String,
    },
    jobSeekerEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

paymentSchema.plugin(mongoosePaginate);

const paymentModel = mongoose.model("payments", paymentSchema);
module.exports = paymentModel;

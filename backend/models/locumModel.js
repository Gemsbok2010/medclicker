const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const locumSchema = new mongoose.Schema(
  {
    nanoId: {
      type: String,
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
      min: 2,
      max: 255,
    },
    lastName: {
      type: String,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    profession: {
      type: String,
    },
    ahpra: {
      type: String,
    },
    driverslicense: {
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
    skillThree: {
      type: String,
    },
    skillThree1: {
      type: String,
    },
    skillThree2: {
      type: String,
    },
    skillThree3: {
      type: String,
    },
    skillPharma1: {
      type: String,
    },
    skillPharma2: {
      type: String,
    },
    skillPharma3: {
      type: String,
    },
    languages: {
      type: String,
    },
    whichlanguage0: {
      type: String,
    },
    whichlanguage1: {
      type: String,
    },
    whichlanguage2: {
      type: String,
    },
    languageLvl0: {
      type: String,
    },
    languageLvl1: {
      type: String,
    },
    languageLvl2: {
      type: String,
    },
    skillTwo: {
      type: String,
    },
    skillTwo1: {
      type: String,
    },
    skillTwo2: {
      type: String,
    },
    skillTwo3: {
      type: String,
    },
    skillComp1: {
      type: String,
    },
    skillComp2: {
      type: String,
    },
    skillComp3: {
      type: String,
    },
    skillOne: {
      type: String,
    },
    skillOne1: {
      type: String,
    },
    skillOne2: {
      type: String,
    },
    skillOne3: {
      type: String,
    },
    skillProf1: {
      type: String,
    },
    skillProf2: {
      type: String,
    },
    skillProf3: {
      type: String,
    },
    resume: {
      type: String,
    },
    education: {
      type: String,
    },
    degree1: {
      type: String,
    },
    degree2: {
      type: String,
    },
    degree3: {
      type: String,
    },
    university1: {
      type: String,
    },
    university2: {
      type: String,
    },
    university3: {
      type: String,
    },
    finish1: {
      type: String,
    },
    finish2: {
      type: String,
    },
    finish3: {
      type: String,
    },
    start1: {
      type: String,
    },
    start2: {
      type: String,
    },
    start3: {
      type: String,
    },
    workhistory: {
      type: String,
    },
    honourTitle: {
      type: String,
    },
    honourAwards: {
      type: String,
    },
    SMStext: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Array,
      default: [],
    },
    activeButton: {
      type: Number,
    },
    filename: {
      type: String,
    },
    showLocum: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
locumSchema.plugin(mongoosePaginate);
const locumModel = mongoose.model("locums", locumSchema);
module.exports = locumModel;

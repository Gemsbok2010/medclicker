const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const homepageSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: true,
    },
    heroBanner: {
      type: String,
    },
    messageOn: {
      type: Boolean,
      default: false,
    },
    titleOfMessage: {
      type: String,
    },
    messageToAll: {
      type: String,
    },
    swiperOn: {
      type: Boolean,
      default: false,
    },
    commentator1: {
      type: String,
    },
    comment1: {
      type: String,
    },
    commentator2: {
      type: String,
    },
    comment2: {
      type: String,
    },
    commentator3: {
      type: String,
    },
    comment3: {
      type: String,
    },
    commentator4: {
      type: String,
    },
    comment4: {
      type: String,
    },
  },
  { timestamps: true }
);

homepageSchema.plugin(mongoosePaginate);

const homepageModel = mongoose.model("homepages", homepageSchema);
module.exports = homepageModel;

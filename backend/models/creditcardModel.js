const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const creditCardSchema = new mongoose.Schema(
  {
    cardName: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    cardNumber: {
      type: Number,
      required: true,
      min: 16,
      max: 19,
    },
    cvv: {
      type: Number,
      required: true,
      min: 4,
      max: 5,
    },
    cvv: {
      type: Number,
      required: true,
      min: 3,
      max: 4,
    },

    saveCard: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

creditCardSchema.plugin(mongoosePaginate);
const creditcardModel = mongoose.model("credit_card", creditCardSchema);
module.exports = creditcardModel;

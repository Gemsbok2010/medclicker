const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const paymentcardSchema = new mongoose.Schema(
  {
    save_card: {
      type: Boolean,
      default: false,
    },
    cardName: {
      type: String,
    },
    cardNumber: {
      type: String,
    },

    expiry: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

paymentcardSchema.plugin(mongoosePaginate);
const paymentCardModel = mongoose.model("payment_cards", paymentcardSchema);
module.exports = paymentCardModel;

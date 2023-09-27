const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const paymentSchema = new mongoose.Schema(
  {
    regularPayment: {
      type: Boolean,
      default: true,
    },
    freeDays: {
      type: Number,
      default: 30,
    },
    expDays1: {
      type: Number,
      default: null,
    },
    regFee1: {
      type: Number,
      default: null,
    },
    regDiscount1: {
      type: Number,
      default: null,
    },
    regPlan1: {
      type: Boolean,
      default: false,
    },
    socialMed1: {
      type: Boolean,
      default: false,
    },
    newsletter1: {
      type: Boolean,
      default: false,
    },
    expDays2: {
      type: Number,
      default: null,
    },
    regFee2: {
      type: Number,
      default: null,
    },
    regDiscount2: {
      type: Number,
      default: null,
    },
    regPlan2: {
      type: Boolean,
      default: false,
    },
    socialMed2: {
      type: Boolean,
      default: false,
    },
    newsletter2: {
      type: Boolean,
      default: false,
    },
    expDays3: {
      type: Number,
      default: null,
    },
    regFee3: {
      type: Number,
      default: null,
    },
    regDiscount3: {
      type: Number,
      default: null,
    },
    regPlan3: {
      type: Boolean,
      default: false,
    },
    socialMed3: {
      type: Boolean,
      default: false,
    },
    newsletter3: {
      type: Boolean,
      default: false,
    },
    locumPayment: {
      type: Boolean,
      default: true,
    },

    locumMin1: {
      type: Number,
      default: null,
    },
    locumMax1: {
      type: Number,
      default: null,
    },
    locumFee1: {
      type: Number,
      default: null,
    },
    locumDiscount1: {
      type: Number,
      default: null,
    },

    locumMin2: {
      type: Number,
      default: null,
    },
    locumMax2: {
      type: Number,
      default: null,
    },
    locumFee2: {
      type: Number,
      default: null,
    },
    locumDiscount2: {
      type: Number,
      default: null,
    },

    locumMin3: {
      type: Number,
      default: null,
    },
    locumMax3: {
      type: Number,
      default: null,
    },
    locumFee3: {
      type: Number,
      default: null,
    },
    locumDiscount3: {
      type: Number,
      default: null,
    },

    locumMin4: {
      type: Number,
      default: null,
    },
    locumMax4: {
      type: Number,
      default: null,
    },
    locumFee4: {
      type: Number,
      default: null,
    },
    locumDiscount4: {
      type: Number,
      default: null,
    },

    locumMin5: {
      type: Number,
      default: null,
    },
    locumMax5: {
      type: Number,
      default: null,
    },
    locumFee5: {
      type: Number,
      default: null,
    },
    locumDiscount5: {
      type: Number,
      default: null,
    },

    locumMin6: {
      type: Number,
      default: null,
    },
    locumMax6: {
      type: Number,
      default: null,
    },
    locumFee6: {
      type: Number,
      default: null,
    },
    locumDiscount6: {
      type: Number,
      default: null,
    },

    locumMin7: {
      type: Number,
      default: null,
    },
    locumMax7: {
      type: Number,
      default: null,
    },
    locumFee7: {
      type: Number,
      default: null,
    },
    locumDiscount7: {
      type: Number,
      default: null,
    },

    locumMin8: {
      type: Number,
      default: null,
    },
    locumMax8: {
      type: Number,
      default: null,
    },
    locumFee8: {
      type: Number,
      default: null,
    },
    locumDiscount8: {
      type: Number,
      default: null,
    },

    locumMin9: {
      type: Number,
      default: null,
    },
    locumMax9: {
      type: Number,
      default: null,
    },
    locumFee9: {
      type: Number,
      default: null,
    },
    locumDiscount9: {
      type: Number,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

paymentSchema.plugin(mongoosePaginate);
const paymentPlansModel = mongoose.model("payment_plans", paymentSchema);
module.exports = paymentPlansModel;

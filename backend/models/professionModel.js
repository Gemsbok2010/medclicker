const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const professionSchema = new mongoose.Schema(
  {
    professionName: {
      type: String,
    },
    contractType: {
      type: String,
    },

    showProfession: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
professionSchema.plugin(mongoosePaginate);
const professionModel = mongoose.model("professions", professionSchema);
module.exports = professionModel;

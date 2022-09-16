const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdvanceSalarySchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Schema.Types.Number,
      default: 0.0,
    },
    images: [
      {
        type: String,
      },
    ],
    note: {
      type: String,
    },
  },
  { versionKey: false }
);

const AdvanceSalary = mongoose.model("AdvanceSalary", AdvanceSalarySchema);
module.exports = { AdvanceSalary };

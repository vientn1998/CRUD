const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobTypeSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["individual", "organization"],
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "active",
    },
  },
  { versionKey: false }
);

const JobType = mongoose.model("JobType", JobTypeSchema);
module.exports = { JobType };

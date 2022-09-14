const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    authType: {
      type: String,
      enum: ["google", "phone", "apple"],
    },
    socicalId: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    passCode: {
      type: String,
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = { Job };

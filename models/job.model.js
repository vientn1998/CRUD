const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["singal", "organization"],
      default: "singal"
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    timekeepingType: [
      {
        type: Schema.Types.ObjectId,
        ref: "TimekeepingType",
      },
    ],
    timekeeping: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: String,
      },
    ],
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "active",
    },
  },
  { versionKey: false }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = { Job };

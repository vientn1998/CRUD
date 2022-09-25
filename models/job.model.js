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
      enum: ["individual", "organization"],
      default: "individual",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    timekeepings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timekeeping",
      },
    ],
    timekeepingTypes: [
      {
        type: Schema.Types.ObjectId,
        ref: "TimekeepingType",
      },
    ],
    totalChecked: {
      type: Schema.Types.Number,
      default: 0,
    },
    totalSalary: {
      type: Schema.Types.Number,
      default: 0,
    },
    totalAdvance: {
      type: Schema.Types.Number,
      default: 0,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    reminderTime: {
      type: Date,
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
  { versionKey: false, timestamps: true, }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = { Job };

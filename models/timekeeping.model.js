const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimekeepingSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    timekeepingType: {
      type: Schema.Types.ObjectId,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Schema.Types.Number,
      default: 0.0,
    },
    totalTime: {
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

const Timekeeping = mongoose.model("Timekeeping", TimekeepingSchema);
module.exports = { Timekeeping };

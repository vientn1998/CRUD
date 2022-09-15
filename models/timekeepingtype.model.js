const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimekeepingTypeSchema = new Schema(
  {
    name: {
      type: String,
    },
    jobId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    salary: {
      type: Schema.Types.Number,
      default: 0.0,
    },
    type: {
      type: String,
      enum: ["hour", "day", "wifi"],
    },
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

const TimekeepingType = mongoose.model(
  "TimekeepingType",
  TimekeepingTypeSchema
);
module.exports = { TimekeepingType };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deviceId: String,
    deviceName: String,
    deviceVersion: String,
    platform: {
      type: String,
      enum: ["iOS", "Android"],
      default: "Android",
    },
  },
  { versionKey: false,  }
);

const Device = mongoose.model("Device", DeviceSchema);
module.exports = { Device };

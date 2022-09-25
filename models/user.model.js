const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    authType: {
      type: String,
      enum: ["google", "phone", "apple", "deviceId"],
    },
    devices: [{
      type: Schema.Types.ObjectId,
      ref: "Device"
    }],
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

const User = mongoose.model("User", UserSchema);
module.exports = { User };

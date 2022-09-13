const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      default: "",
    },
    auth_type: {
      type: String,
      enum: ["google", "phone", "apple"],
    },
    socical_id: {
      type: String,
      default: null,
    },
    email: {
      type: String,
    },
    phone_number: {
        type: String,
      },
    pass_code: {
      type: String,
    },
    avatar: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "active",
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };

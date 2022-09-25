const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["image", "pdf"],
      default: "image",
    },
    path: {
      type: String
    }
  },
  { versionKey: false }
);
const Image = mongoose.model("Image", ImageSchema);

module.exports = { Image };

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const multer = require("multer");
const path = require("path");
const configs = require("./configs/database");

mongoose.connect(configs.database);

const userRouter = require("./routes/user");
const timekeepingtypeRouter = require("./routes/timekeepingtype");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (res, file, cd) => {
    cd(null, "public/images");
  },
  filename: (res, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to crud" });
});

app.use("/api/user", userRouter);
app.use("/api/timekeepingtype",timekeepingtypeRouter);



var server = app.listen(3000, function () {
  console.log("Server listening on port " + server.address().port);
});

module.exports = app;
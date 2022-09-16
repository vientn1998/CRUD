require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const multer = require("multer");
const path = require("path");
const configs = require("./configs/database");

mongoose.connect(configs.database);

const userRouter = require("./routes/user.route");
const timekeepingtypeRouter = require("./routes/timekeepingType.route");
const advanceSalaryRouter = require("./routes/advanceSalary.route");
const jobRouter = require("./routes/job.route");
const timekeepingRouter = require("./routes/timekeeping.route");

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
app.use("/api/advancesalary",advanceSalaryRouter);
app.use("/api/job",jobRouter);
app.use("/api/timekeeping",timekeepingRouter);



var server = app.listen(3000, function () {
  console.log("Server listening on port " + server.address().port);
});

module.exports = app;
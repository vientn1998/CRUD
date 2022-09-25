require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const configs = require("./configs/database");

mongoose.connect(configs.database);

const userRouter = require("./routes/user.route");
const timekeepingtypeRouter = require("./routes/timekeepingType.route");
const advanceSalaryRouter = require("./routes/advanceSalary.route");
const jobRouter = require("./routes/job.route");
const timekeepingRouter = require("./routes/timekeeping.route");
const uploadRouter = require("./routes/upload.route");
const upload = require("./middleware/upload");


const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/uploads', express.static(__dirname +'/public/uploads'));    


app.get("/", (req, res) => {
  res.json({ message: "Welcome to crud" });
});

app.use("/api/user", userRouter);
app.use("/api/timekeepingtype",timekeepingtypeRouter);
app.use("/api/advancesalary",advanceSalaryRouter);
app.use("/api/job",jobRouter);
app.use("/api/timekeeping",timekeepingRouter);
app.use("/api/file",upload.array("files", 3), uploadRouter);


var server = app.listen(3000, function () {
  console.log("Server listening on port " + server.address().port);
});

module.exports = app;
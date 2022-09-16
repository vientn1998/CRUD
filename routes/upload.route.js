const express = require("express");
const router = express.Router();
const {signup, getProfile, getUsers, update} = require("../controllers/upload.controller");

router.get("/pull-image", pullImage);
router.post("/push-image", pushImage);

module.exports = router;
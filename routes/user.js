const express = require("express");
const router = express.Router();
const {signup, getProfile, getUsers, update} = require("../controllers/userControllers");

router.post("/sign-up", signup);
router.get("/", getUsers);
router.get("/getProfile/:phone_number", getProfile);
router.post("/update", update);

module.exports = router;
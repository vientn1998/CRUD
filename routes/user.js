const express = require("express");
const router = express.Router();
const {signup, getProfile, getUsers, update} = require("../controllers/userControllers");

router.post("/sign-up", signup);
router.get("/", getUsers);
router.get("/getProfile/:phoneNumber", getProfile);
router.post("/update/:id", update);

module.exports = router;
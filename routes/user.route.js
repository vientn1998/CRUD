const express = require("express");
const router = express.Router();
const {
  signUpPhone,
  signUpDeviceId,
  getProfile,
  getProfileById,
  getUsers,
  getDevices,
  update,
} = require("../controllers/user.controllers");

router.post("/sign-up-phone", signUpPhone);
router.post("/sign-up-device", signUpDeviceId);
router.get("/", getUsers);
router.get("/getDevices", getDevices);
router.get("/checkDeviceId", getDevices);
router.get("/getProfile/:phoneNumber", getProfile);
router.get("/getProfileById/:userId", getProfileById);
router.post("/update/:id", update);

module.exports = router;

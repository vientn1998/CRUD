const express = require("express");
const router = express.Router();
const {create, update, getAll} = require("../controllers/timekeeping.controller");

router.post("/create", create);
router.post("/update", update);
router.get("/", getAll);

module.exports = router;
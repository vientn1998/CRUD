const express = require("express");
const router = express.Router();
const {create, update, getAll, getDetailById} = require("../controllers/job.controller");

router.post("/create", create);
router.post("/update", update);
router.get("/", getAll);
router.get("/getDetailById/:id", getDetailById);

module.exports = router;
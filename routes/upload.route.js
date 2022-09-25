const express = require("express");
const router = express.Router();
const {uploadFile, deleteFile} = require("../controllers/upload.controller");

router.post("/upload", uploadFile);
router.delete("/delete/:id", deleteFile);

module.exports = router;
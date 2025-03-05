const express = require("express");
const router = express.Router();
const { suggestTask } = require("../controller/taskController");

router.post("/suggest",suggestTask);

module.exports = router;
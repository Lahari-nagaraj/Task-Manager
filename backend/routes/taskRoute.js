const express = require("express");
const router = express.Router();
const { suggestTask, createTask, getAllTask } = require("../controller/taskController");

router.post("/suggest",suggestTask);
router.post("/createTask",createTask);
router.post("/getTaskList",getAllTask);

module.exports = router;
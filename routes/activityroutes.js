const express = require("express");
const {
  createActivity,
  getActivities,
  getStatistics,
} = require("../controllers/activitycontroller");

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/statistics", getStatistics);

module.exports = router;

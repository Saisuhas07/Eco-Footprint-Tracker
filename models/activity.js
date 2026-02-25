const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  impact: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);

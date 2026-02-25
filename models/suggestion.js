const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  suggestion: { type: String, required: true },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);

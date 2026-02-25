const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Suggestion = require("../models/suggestion");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedSuggestions = async () => {
  await connectDB();

  const suggestions = [
    { category: "Transport", limit: 100, suggestion: "Use public transport or carpooling." },
    { category: "Food", limit: 100, suggestion: "Minimize food wastage and eat locally-sourced foods." },
    { category: "Energy", limit: 100, suggestion: "Switch to energy-efficient appliances and renewable sources." },
  ];

  try {
    await Suggestion.insertMany(suggestions);
    console.log("Suggestions added successfully");
    process.exit();
  } catch (error) {
    console.error("Failed to add suggestions:", error.message);
    process.exit(1);
  }
};

seedSuggestions();

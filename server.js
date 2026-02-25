const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


const activityRouter = require("./routes/activityroutes");
app.use("/api/activities", activityRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Eco-Footprint Tracker API!");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

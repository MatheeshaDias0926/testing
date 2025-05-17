const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Add a root endpoint for health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://Matheesha:Matheesha@cluster0.xqfraot.mongodb.net",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

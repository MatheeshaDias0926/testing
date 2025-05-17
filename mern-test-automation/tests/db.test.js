require("dotenv").config({ path: __dirname + "/../backend/.env" });

// Database tests using Mocha and Mongoose
const mongoose = require("mongoose");
const User = require("../backend/models/User");
const expect = require("chai").expect;

describe("Database Tests", () => {
  before(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("should find a user in the database", async () => {
    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ email: "test@example.com" });
    console.log("User found (raw query):", user);
    expect(user).to.not.be.null;
  });
  // Add more DB tests here
});

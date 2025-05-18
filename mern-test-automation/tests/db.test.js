require("dotenv").config({ path: __dirname + "/../backend/.env" });

// Database tests using Mocha and Mongoose
const mongoose = require("mongoose");
const User = require("../backend/models/User");
const expect = require("chai").expect;

describe("Database Tests", () => {
  before(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      // Insert a user for the find test
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "testpass123",
      });
      console.log("Connected to MongoDB and inserted test user");
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

  it("DB-001: should perform CRUD operations for a user", async () => {
    const timestamp = Date.now();
    // Create
    const user = new User({
      username: `dbuser_${timestamp}`,
      email: `db_${timestamp}@test.com`,
      password: "testpass123",
    });
    const savedUser = await user.save();
    expect(savedUser._id).to.exist;
    // Read
    const found = await User.findById(savedUser._id);
    expect(found.email).to.equal(user.email);
    // Update
    found.username = "updateduser";
    await found.save();
    const updated = await User.findById(savedUser._id);
    expect(updated.username).to.equal("updateduser");
    // Delete
    await User.deleteOne({ _id: savedUser._id });
    const deleted = await User.findById(savedUser._id);
    expect(deleted).to.be.null;
  });

  it("DB-002: should enforce schema validation", async () => {
    // Empty username
    try {
      await User.create({
        username: "",
        email: "test@example.com",
        password: "testpass123",
      });
      throw new Error("Should have failed validation");
    } catch (err) {
      expect(err.message).to.include("validation failed");
    }
    // Invalid email
    try {
      await User.create({
        username: "testuser",
        email: "invalid-email",
        password: "testpass123",
      });
      throw new Error("Should have failed validation");
    } catch (err) {
      expect(err.message).to.include("validation failed");
    }
    // Short password
    try {
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "123",
      });
      throw new Error("Should have failed validation");
    } catch (err) {
      expect(err.message).to.include("validation failed");
    }
  });
  // Add more DB tests here
});

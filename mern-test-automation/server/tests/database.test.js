const mongoose = require("mongoose");
// Fix: set strictQuery to suppress deprecation warning
mongoose.set("strictQuery", true);
const User = require("../models/User");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Database Tests", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("DB-001: CRUD Operations", async () => {
    // Create
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();

    // Read
    const foundUser = await User.findById(savedUser._id);
    expect(foundUser.email).toBe("test@example.com");

    // Update
    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { username: "updateduser" },
      { new: true }
    );
    expect(updatedUser.username).toBe("updateduser");

    // Delete
    await User.deleteOne({ _id: savedUser._id });
    const deletedUser = await User.findById(savedUser._id);
    expect(deletedUser).toBeNull();
  });

  test("DB-002: Schema Validation", async () => {
    // Empty username
    await expect(
      User.create({
        username: "",
        email: "test@example.com",
        password: "password123",
      })
    ).rejects.toThrow("User validation failed");

    // Invalid email
    await expect(
      User.create({
        username: "testuser",
        email: "invalid-email",
        password: "password123",
      })
    ).rejects.toThrow("User validation failed");

    // Short password
    await expect(
      User.create({
        username: "testuser",
        email: "test@example.com",
        password: "123",
      })
    ).rejects.toThrow("User validation failed");
  });
});

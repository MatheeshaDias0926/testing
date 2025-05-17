const mongoose = require("mongoose");
const User = require("../../backend/models/User");

describe("CRUD Operations (DB-001)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should perform all CRUD operations on User model", async () => {
    // Create
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(user._id).toBeDefined();

    // Read
    const foundUser = await User.findOne({ email: "test@example.com" });
    expect(foundUser.username).toBe("testuser");

    // Update
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { username: "updateduser" },
      { new: true }
    );
    expect(updatedUser.username).toBe("updateduser");

    // Delete
    await User.findByIdAndDelete(user._id);
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});

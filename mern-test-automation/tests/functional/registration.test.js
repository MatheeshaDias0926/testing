const request = require("supertest");
const app = require("../../backend/app");
const User = require("../../backend/models/User");
const mongoose = require("mongoose");

describe("User Registration Flow (FR-001)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should register a new user successfully", async () => {
    const timestamp = Date.now();
    const testData = {
      username: `seleniumuser_${timestamp}`,
      email: `selenium_${timestamp}@test.com`,
      password: "testpass123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(testData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(/successfully/i);

    // Verify user exists in database
    const user = await User.findOne({ email: testData.email });
    expect(user).toBeTruthy();
    expect(user.username).toBe(testData.username);
  });
});

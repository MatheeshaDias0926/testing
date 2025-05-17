const request = require("supertest");
const app = require("../../backend/app");
const User = require("../../backend/models/User");
const mongoose = require("mongoose");

describe("Duplicate User Handling (API-002)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    // Create existing user
    await User.create({
      username: "existinguser",
      email: "existing@example.com",
      password: "password123",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should reject duplicate email registration", async () => {
    const testData = {
      username: "newuser",
      email: "existing@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(testData);

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/already exists/i);
  });
});

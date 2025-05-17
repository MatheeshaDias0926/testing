const request = require("supertest");
const app = require("../../backend/app");
const User = require("../../backend/models/User");
const mongoose = require("mongoose");

describe("Registration Endpoint (API-001)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new user via API", async () => {
    const testData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(testData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toMatch(/successfully/i);

    // Verify database record
    const user = await User.findOne({ email: testData.email });
    expect(user).toBeTruthy();
    expect(user.username).toBe(testData.username);
  });
});

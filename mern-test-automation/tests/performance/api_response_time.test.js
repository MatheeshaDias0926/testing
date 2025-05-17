const request = require("supertest");
const app = require("../../backend/app");
const User = require("../../backend/models/User");
const mongoose = require("mongoose");

describe("API Response Time (PERF-001)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should respond within 1000ms for registration requests", async () => {
    const testRequests = [];
    const startTime = Date.now();

    for (let i = 0; i < 5; i++) {
      const timestamp = Date.now() + i;
      testRequests.push(
        request(app)
          .post("/api/auth/register")
          .send({
            username: `user_${timestamp}`,
            email: `user_${timestamp}@test.com`,
            password: "password123",
          })
      );
    }

    const responses = await Promise.all(testRequests);
    const totalTime = Date.now() - startTime;
    const averageTime = totalTime / 5;

    console.log(`Average response time: ${averageTime}ms`);
    expect(averageTime).toBeLessThan(1000);

    // Verify all requests succeeded
    responses.forEach((response) => {
      expect(response.status).toBe(201);
    });
  });
});

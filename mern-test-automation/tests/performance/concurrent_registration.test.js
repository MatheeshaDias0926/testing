const request = require("supertest");
const app = require("../../backend/app");
const User = require("../../backend/models/User");
const mongoose = require("mongoose");

describe("Concurrent User Registration (PERF-002)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should handle 10 concurrent registration requests", async () => {
    const testRequests = [];
    const startTime = Date.now();

    for (let i = 0; i < 10; i++) {
      const timestamp = Date.now() + i;
      testRequests.push(
        request(app)
          .post("/api/auth/register")
          .send({
            username: `concurrent_${timestamp}`,
            email: `concurrent_${timestamp}@test.com`,
            password: "password123",
          })
      );
    }

    const responses = await Promise.all(testRequests);
    const totalTime = Date.now() - startTime;

    console.log(
      `Total execution time for 10 concurrent requests: ${totalTime}ms`
    );

    // Verify all requests succeeded
    const successCount = responses.filter((r) => r.status === 201).length;
    expect(successCount).toBe(10);
  });
});

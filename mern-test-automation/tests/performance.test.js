// Performance tests for API
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const server = "http://localhost:5000";

describe("Performance Tests", function () {
  this.timeout(20000);

  it("PERF-001: should respond within 1000ms for 5 sequential requests", async function () {
    let total = 0;
    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      await new Promise((resolve) =>
        chai
          .request(server)
          .get("/")
          .end(() => resolve())
      );
      total += Date.now() - start;
    }
    const avg = total / 5;
    expect(avg).to.be.below(1000);
  });

  it("PERF-002: should handle 10 concurrent registrations", async function () {
    const timestamp = Date.now();
    const users = Array.from({ length: 10 }).map((_, i) => ({
      username: `perfuser_${timestamp}_${i}`,
      email: `perf_${timestamp}_${i}@test.com`,
      password: "testpass123",
    }));
    const promises = users.map((user) =>
      chai.request(server).post("/api/auth/register").send(user)
    );
    const results = await Promise.all(promises);
    results.forEach((res) => {
      expect(res).to.have.status(201);
    });
  });
});

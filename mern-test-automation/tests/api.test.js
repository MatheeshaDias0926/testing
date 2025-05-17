// API tests using Mocha and Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const server = "http://localhost:5000";

describe("API Tests", () => {
  it("should return 400 for /api/auth/login with invalid credentials", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .end((err, res) => {
        // Expecting 400 for invalid credentials, update this if you expect 200
        expect(res).to.have.status(400);
        done();
      });
  });

  it("FR-001: should register a new user (User Registration Flow)", function (done) {
    const timestamp = Date.now();
    const user = {
      username: `seleniumuser_${timestamp}`,
      email: `selenium_${timestamp}@test.com`,
      password: "testpass123",
    };
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property("message")
          .that.includes("registered");
        done();
      });
  });

  it("FR-002: should show validation errors for invalid form input (Form Validation)", function (done) {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({ username: "", email: "invalid-email", password: "123" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("API-002: should not allow duplicate user registration", function (done) {
    const user = {
      username: "duplicateuser",
      email: "existing@example.com",
      password: "password123",
    };
    // Register once
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end(() => {
        // Try to register again
        chai
          .request(server)
          .post("/api/auth/register")
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .that.includes("exists");
            done();
          });
      });
  });
  // Add more API tests here
});

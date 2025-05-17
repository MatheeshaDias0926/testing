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
  // Add more API tests here
});

const request = require("supertest");
const app = require("../app"); // Adjust the path as necessary
const mongoose = require("mongoose");

// Fix: set strictQuery to suppress deprecation warning
mongoose.set("strictQuery", true);

// Increase Jest timeout for all tests in this file
jest.setTimeout(20000);

describe("API Endpoints", () => {
  it("should return a 200 status for the root endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("should register a new user", async () => {
    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "testuser@example.com",
    };

    const response = await request(app)
      .post("/api/register") // Adjust the endpoint as necessary
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
  });

  it("should login an existing user", async () => {
    const userCredentials = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/login") // Adjust the endpoint as necessary
      .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 404 for non-existent routes", async () => {
    const response = await request(app).get("/api/nonexistent");
    expect(response.status).toBe(404);
  });
});

const request = require("supertest");
const app = require("../../backend/app");

describe("Form Validation (FR-002)", () => {
  const testCases = [
    {
      description: "should reject empty username",
      data: { username: "", email: "valid@test.com", password: "validpass123" },
      expectedError: "All fields are required",
    },
    {
      description: "should reject invalid email format",
      data: {
        username: "testuser",
        email: "invalid-email",
        password: "validpass123",
      },
      expectedError: "Invalid email format",
    },
    {
      description: "should reject too short password",
      data: { username: "testuser", email: "valid@test.com", password: "123" },
      expectedError: "Password must be at least 6 characters",
    },
  ];

  testCases.forEach(({ description, data, expectedError }) => {
    it(description, async () => {
      const response = await request(app).post("/api/auth/register").send(data);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain(expectedError);
    });
  });
});

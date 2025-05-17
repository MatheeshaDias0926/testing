const mongoose = require("mongoose");
const User = require("../../backend/models/User");

describe("Schema Validation (DB-002)", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testCases = [
    {
      description: "should reject empty username",
      data: { username: "", email: "valid@test.com", password: "validpass123" },
      errorField: "username",
    },
    {
      description: "should reject invalid email",
      data: {
        username: "testuser",
        email: "invalid-email",
        password: "validpass123",
      },
      errorField: "email",
    },
    {
      description: "should reject empty password",
      data: { username: "testuser", email: "valid@test.com", password: "" },
      errorField: "password",
    },
  ];

  testCases.forEach(({ description, data, errorField }) => {
    it(description, async () => {
      let error;
      try {
        await User.create(data);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors[errorField]).toBeDefined();
    });
  });
});

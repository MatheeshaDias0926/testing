const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ error: `${field} already exists` });
    } else if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({ error: messages.join(", ") });
    } else {
      // Log error for debugging
      console.error(error);
      res.status(500).json({ error: error.message || "Server error" });
    }
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // For demo: compare plain text (in production, use hashed passwords)
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Simulate token
    res.status(200).json({
      token: "fake-jwt-token",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

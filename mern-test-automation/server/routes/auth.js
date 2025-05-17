const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.register);
router.get("/users", authController.getUsers);
router.post("/login", authController.login);

module.exports = router;

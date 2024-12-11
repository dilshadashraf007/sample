const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate the incoming data
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, password, and role" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

 
    // Create the new user
    const newUser = new User({
      name,
      email,
      password: password,
      role, // Save the role
    });
    console.log(newUser);
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1000h" }
    );

    res.status(201).json({ message: "User created", token });
  } catch (err) {
    console.error(err); // Log the error to check for issues
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the incoming data
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password!= user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a new JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1000h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err); // Log the error to check for issues
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});


module.exports = router;
const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const express=require('express');


// User Registration (Signup)
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Auth.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Register the new user
    const newUser = await Auth.registerUser(name, email, password);

    // Create a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Auth.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isValidPassword = await Auth.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,{ expiresIn: '10d' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

module.exports = {
  signup,
  login
};

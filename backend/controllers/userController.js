
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRoutes = require('../routes/userRoutes');
const express=require('express');
const authMiddleware=require('../middleware/authMiddleware');


exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create({ email, password, name, role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Fetch user profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await user.findById(req.user.id); // req.user is set by authMiddleware
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({user});
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
//};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role, 
    };
    const updatedUser = await User.updateById(req.user.id, userData);
    res.json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

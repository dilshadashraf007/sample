
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path to your model
require('dotenv').config();

const router = express.Router();

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token is required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = decoded.id; 
    next();
  });
};

// Update work type route
router.post('/update-work-type', authenticateToken, async (req, res) => {
  const { workType, workDate } = req.body;

  if (!workType || !workDate) {
    return res.status(400).json({ error: 'Work type and date are required' });
  }

  try {
   
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

 
    user.workType = workType;
    user.workDate = new Date(workDate); 

    await user.save(); 

    res.status(200).json({ message: 'Work type updated successfully' });
  } catch (err) {
    console.error('Error updating work type:', err);
    res.status(500).json({ error: 'Failed to update work type' });
  }
});

module.exports = router;

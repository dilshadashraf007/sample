const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id; 
  });

  next()
};


router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assuming you're using MongoDB
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({data: user});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

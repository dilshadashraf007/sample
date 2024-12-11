const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Assuming you have a User model
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id);  // Find the user by ID from the decoded token

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Handle query parameters
    const query = req.query.query || '';  // Get the query parameter
    let filteredData = user.data.filter(item => item.name.includes(query));  // Example filtering by name

    res.send({
      name: user.name,
      email: user.email,
      role: user.role,
      data: filteredData,  // Return filtered data based on the query
    });
  } catch (err) {
    res.status(401).send({ message: 'Invalid token.' });
  }
});

module.exports = router;

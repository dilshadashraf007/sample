const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path'); 
const bcrypt=require('bcrypt');

const router = express.Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.js')); // Adjust path as needed
});
router.get('/', (req, res) => res.send('Route is working'));

// GET route for registration (use userController.register or another handler here)
router.get('/register', (req, res) => {
  // You can either serve a registration page, a form, or any other content related to registration
  res.send('Registration Page'); // or render a registration form, depending on your setup
});

// POST route for registration
router.post('/register', userController.register);

// POST route for login
router.post('/login', userController.login);

// // GET route for user profile, using authMiddleware for authentication
// router.get('/profile', authMiddleware, userController.getUserProfile);


// PUT route for updating user profile, also using authMiddleware
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;

// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const User = require("../models/user");
// require('dotenv').config(); // To load environment variables from .env file

// const app = express();

// // Middleware for parsing JSON requests
// app.use(bodyParser.json());

// // MongoDB connection (replace with your connection string)
// mongoose.connect('mongodb://localhost:27017/feedbackdb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token

//   if (!token) {
//     return res.status(403).send('Access Denied');
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Use environment variable for secret key
//     if (err) {
//       return res.status(403).send('Invalid Token');
//     }
//     req.user = user; // Store the decoded user info in request
//     next(); // Proceed to next middleware or route handler
//   });
// };

// // Feedback model (MongoDB schema)
// const feedbackSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
//   createdAt: { type: Date, default: Date.now }
// });

// const Feedback = mongoose.model('Feedback', feedbackSchema);

// // Feedback submission route
// app.post('/api/feedbacks', authenticateToken, async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).send('Feedback message is required');
//   }

//   try {
//     // Save the feedback to the database
//     const feedback = new Feedback({
//       message,
//       userId: req.user._id, // Save user ID from decoded JWT token
//     });
    
//     await feedback.save();
//     res.status(201).send('Feedback submitted successfully');
//   } catch (err) {
//     res.status(500).send('Error saving feedback');
//   }
// });

// // Server setup
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

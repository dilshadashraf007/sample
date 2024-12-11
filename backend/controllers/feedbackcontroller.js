// // backend/controllers/feedbackController.js
// const Feedback = require('../models/Feedback'); // Assuming Feedback is a Mongoose model

// const submitFeedback = async (req, res) => {
//   const { message } = req.body;

//   try {
//     const feedback = new Feedback({ message, user: req.user.userId });
//     await feedback.save();

//     res.status(200).json({ message: 'Feedback submitted successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to submit feedback. Please try again.' });
//   }
// };

// module.exports = { submitFeedback };

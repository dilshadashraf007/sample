const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router(); // Initialize the router

// Route to create an event (protected route)
router.post('/', authMiddleware, createEvent);

// Route to get all events
router.get('/', getAllEvents);

// Route to get a specific event by ID
router.get('/:id', getEventById);

// Route to update an event (protected route)
router.put('/:id', authMiddleware, updateEvent);

// Route to delete an event (protected route)
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;

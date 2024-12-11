// In your Express backend
const express = require('express');
const Employee = require('./models/Employee');  // Assuming Employee is a MongoDB model
const router = express.Router();

// POST route for adding a new employee
router.post('/api/employees', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const newEmployee = new Employee({ name, email, phone, role });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error adding employee' });
  }
});

module.exports = router;

const express=require('express');

const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      assigned_to: req.body.assigned_to,
      status: req.body.status || 'pending', // default to 'pending'
      created_by: req.user.id, // assuming req.user is set in authMiddleware
    };
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      assigned_to: req.body.assigned_to,
      status: req.body.status,
    };
    const updatedTask = await Task.updateById(req.params.id, taskData);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.deleteById(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error})
  }
}

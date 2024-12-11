
const Notification = require('../models/notification');
const express=require('express');

// Create a new notification
const createNotification = async (req, res) => {
  const { user_id, message } = req.body; // user_id and message should come from request body

  try {
    const notification = await Notification.createNotification(user_id, message);
    res.status(201).json({
      message: 'Notification created successfully',
      notification
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating notification',
      error: err.message
    });
  }
};

// Get all notifications for a user
const getNotifications = async (req, res) => {
  const user_id = req.user.id;  // Extracted from the JWT token via middleware

  try {
    const notifications = await Notification.getNotificationsByUser(user_id);
    res.status(200).json({
      notifications
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching notifications',
      error: err.message
    });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  const { notification_id } = req.params;

  try {
    const notification = await Notification.markAsRead(notification_id);
    res.status(200).json({
      message: 'Notification marked as read',
      notification
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error marking notification as read',
      error: err.message
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead
};

const express=require('express');


const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      created_by: req.user.id, 
    };
    const event = await Event.create(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};


exports.getEventById = async (req, res) => {
  try {
    const event = await Event.getById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    };
    const updatedEvent = await Event.updateById(req.params.id, eventData);
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.deleteById(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

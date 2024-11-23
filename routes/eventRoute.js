const express = require('express');
const { createEvent, getAllEvents, deleteEvent, updateEvent } = require('../controllers/eventController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all events
router.get('/', authenticate, getAllEvents);

// Create a new event (Admin only)
router.post('/', authenticate, isAdmin, createEvent);

// Update an existing event (Admin only)
router.put('/:id', authenticate, isAdmin, updateEvent);

// Delete an event (Admin only)
router.delete('/:id', authenticate, isAdmin, deleteEvent);

module.exports = router;



const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create a booking (task)
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId hotelId tourId');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('userId hotelId tourId');
        if (!task) return res.status(404).json({ message: "Booking not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const express = require('express');
const Tour = require('../models/Tour');

const router = express.Router();

// Create a tour
router.post('/', async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        res.status(201).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tours
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single tour by ID
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a tour
router.put('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });

        // Update tour details
        Object.assign(tour, req.body);

        // Save the updated tour
        const updatedTour = await tour.save();
        res.json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a tour
router.delete('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });

        await tour.remove();
        res.json({ message: "Tour deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

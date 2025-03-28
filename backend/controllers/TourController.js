const Tour = require('../models/Tour');

// Get all tours
const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single tour by ID
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new tour
const createTour = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        res.status(201).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tour
const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });

        Object.assign(tour, req.body);
        const updatedTour = await tour.save();
        res.json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a tour
const deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: "Tour not found" });

        await tour.remove();
        res.json({ message: "Tour deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTours, getTourById, createTour, updateTour, deleteTour };

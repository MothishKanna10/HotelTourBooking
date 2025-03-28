const Hotel = require('../models/Hotel');

// Get all hotels
const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hotel by ID
const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new hotel
const createHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update hotel
const updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });

        Object.assign(hotel, req.body);
        const updatedHotel = await hotel.save();
        res.json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a hotel
const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });

        await hotel.remove();
        res.json({ message: "Hotel deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHotels, getHotelById, createHotel, updateHotel, deleteHotel };

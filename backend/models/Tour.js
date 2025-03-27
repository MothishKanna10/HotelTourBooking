const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in days
  price: { type: Number, required: true },
  description: { type: String },
  itinerary: [{ type: String }], // List of itinerary items
  images: [{ type: String }], // Array of image URLs
  maxPeople: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

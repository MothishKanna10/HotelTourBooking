const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5, default: 3 },
  facilities: [{ type: String }], // Array of strings like ['WiFi', 'Pool']
  images: [{ type: String }], // Array of image URLs
  availableRooms: { type: Number, required: true },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

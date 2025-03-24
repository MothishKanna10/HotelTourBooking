// models/Task.js
const mongoose = require('mongoose');

// Define the task schema for booking
const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: false }, // Reference to hotel (optional)
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: false }, // Reference to tour (optional)
  bookingDate: { type: Date, default: Date.now }, // Date when the booking was made
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Status of the booking
  totalPrice: { type: Number, required: true }, // Total price of the booking
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }, // Payment status
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// models/Booking.js

const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  movieScreen: {
    type: String,
    require: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  bookedSeat: {
    type: String,
    required: true,
    trim: true,
  },
  movieDate: {
    type: Date,
    required: true,
  },
  movieTime: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    required: true,
    trim: true,
  },
  total_price: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    default: 'paid',
    enum: ['paid', 'pending', 'failed'],
  },
  razorpay_payment_id: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model("Booking", BookingSchema);

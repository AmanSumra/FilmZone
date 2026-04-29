// models/MovieReview.js

const mongoose = require("mongoose");

const MovieReviewSchema = new mongoose.Schema({
  MovieName: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
  CustomerName: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
  CustomerEmail: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
    lowercase: true,
  },
  Review: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
  Movieimage: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
});

module.exports = mongoose.model("MovieReview", MovieReviewSchema);

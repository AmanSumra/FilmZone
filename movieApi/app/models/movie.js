// models/Movie.js

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  MovieName: {
    type: String,
    required: true,
    trim: true,
  },
  MoviePhotos: {
    type: String,
    required: true,
    trim: true,
  },
  MovieDate: {
    type: String,
    required: true,
    trim: true,
  },
  MovieScreen: {
    type: String,
    required: true,
    trim: true,
  },
  SeatingCapacity: {
    type: String,
    trim: true,
  },
  MoviePrice: {
    type: Number,
    required: true,
    max: 999,
  },
  Status: {
    type: String,
    required: true,
    trim: true,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  Cast: {
    type: String,
    trim: true,
    default: ""
  },
  Director: {
    type: String,
    trim: true,
    default: ""
  },
  Genre: [{
    type: String,
    trim: true
  }],
  Duration: {
    type: String,
    trim: true,
    default: ""
  },
  Language: {
    type: String,
    trim: true,
    default: "Hindi"
  },
  Reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  AverageRating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Movie", MovieSchema);

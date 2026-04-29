// models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  Gender: {
    type: String,
    required: false,
    enum: ["male", "female", "other", "Male", "Female", "Other"],
    trim: true,
    default: "male",
  },
  Number: {
    type: String,
    required: false,
    validate: {
      validator: (v) => !v || /^[0-9]{10,15}$/.test(v.toString()),
      message: (props) => `${props.value} is not a valid number`,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: String,
    default: "0",
    enum: ["0", "1"],
  },
});

module.exports = mongoose.model("User", UserSchema);

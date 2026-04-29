// models/ContactUs.js

const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true,
    lowercase: true,
  },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  message: {
    type: String,
    required: true,
    maxlength: 150,
    trim: true,
  },
});

module.exports = mongoose.model("ContactUs", ContactUsSchema);

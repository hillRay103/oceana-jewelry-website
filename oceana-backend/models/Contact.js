// models/Contact.js
// Stores messages from your "Contact Us" form on index.html

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,           // helpful to mark messages as read/unread
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

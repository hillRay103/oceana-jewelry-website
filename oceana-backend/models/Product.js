// models/Product.js
// Represents jewelry items (rings, bracelets, pendants, earrings)

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,           // e.g. "Pearl Ring 1"
  },
  category: {
    type: String,
    required: true,
    enum: ['ring', 'bracelet', 'pendant', 'earring'],  // matches your 4 pages
  },
  price: {
    type: Number,
    required: true,           // e.g. 450
  },
  image: {
    type: String,             // e.g. "ring 1.jpg"
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });     // adds createdAt and updatedAt automatically

module.exports = mongoose.model('Product', productSchema);

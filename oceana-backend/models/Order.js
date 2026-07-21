// models/Order.js
// Represents a customer order (when they click "Add to Cart" and checkout)

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productName: { type: String },
      price:       { type: Number },
      quantity:    { type: Number, default: 1 },
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

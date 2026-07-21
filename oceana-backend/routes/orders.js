// routes/orders.js
// CRUD for customer orders

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ─────────────────────────────────────────────
//  CREATE — Place a new order
//  POST /api/orders
//  Body: { customerName, customerEmail, items: [...], totalPrice }
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ message: 'Order placed ✅', order: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ALL — Get all orders
//  GET /api/orders
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ONE — Get single order
//  GET /api/orders/:id
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  UPDATE — Change order status
//  PUT /api/orders/:id
//  Body: { status: "confirmed" }
// ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order updated ✅', order: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  DELETE — Cancel/delete an order
//  DELETE /api/orders/:id
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

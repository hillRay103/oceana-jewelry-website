// routes/products.js
// Full CRUD for jewelry products

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ─────────────────────────────────────────────
//  CREATE — Add a new product
//  POST /api/products
//  Body: { name, category, price, image, description }
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json({ message: 'Product created ✅', product: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ALL — Get all products (optional filter by category)
//  GET /api/products
//  GET /api/products?category=ring
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ONE — Get a single product by ID
//  GET /api/products/:id
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  UPDATE — Edit a product's details
//  PUT /api/products/:id
//  Body: any fields to update e.g. { price: 500 }
// ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // return the updated doc
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated ✅', product: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  DELETE — Remove a product
//  DELETE /api/products/:id
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

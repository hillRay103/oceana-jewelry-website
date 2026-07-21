// routes/contacts.js
// CRUD for Contact Us form messages

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ─────────────────────────────────────────────
//  CREATE — Submit a contact message
//  POST /api/contacts
//  Body: { name, email, message }
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json({ message: 'Message received ✅', contact: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ALL — Get all contact messages
//  GET /api/contacts
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  READ ONE — Get single message
//  GET /api/contacts/:id
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Message not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  UPDATE — Mark message as read
//  PUT /api/contacts/:id
//  Body: { read: true }
// ─────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Contact updated ✅', contact: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  DELETE — Delete a message
//  DELETE /api/contacts/:id
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

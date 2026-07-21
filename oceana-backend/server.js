// =============================================
//   OCEANA JEWELRY STORE - Backend Server
//   MongoDB + Express (CRUD Operations)
// =============================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static('../Iweb/web')); // serve your HTML files

// ── Connect to MongoDB ─────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oceana')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ── Routes ─────────────────────────────────
app.use('/api/products',  require('./routes/products'));
app.use('/api/orders',    require('./routes/orders'));
app.use('/api/contacts',  require('./routes/contacts'));

// ── Health check ───────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OCEANA API is running 🐚' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

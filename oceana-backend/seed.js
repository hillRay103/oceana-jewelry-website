// seed.js
// Run this ONCE to fill your database with sample products
// Command: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/oceana')
  .then(() => console.log('Connected to MongoDB...'));

const sampleProducts = [
  // Rings
  { name: 'Pearl Ring 1',  category: 'ring',     price: 450, image: 'ring 1.jpg',    description: 'Classic white pearl ring' },
  { name: 'Pearl Ring 2',  category: 'ring',     price: 450, image: 'ring 2.jpg',    description: 'Elegant pearl ring' },
  { name: 'Pearl Ring 3',  category: 'ring',     price: 450, image: 'ring 3.jpg',    description: 'Gold pearl ring' },
  { name: 'Pearl Ring 4',  category: 'ring',     price: 450, image: 'ring 4.jpg',    description: 'Silver pearl ring' },
  { name: 'Pearl Ring 5',  category: 'ring',     price: 450, image: 'ring 5.jpg',    description: 'Rose gold pearl ring' },
  // Bracelets
  { name: 'Bracelet 1',    category: 'bracelet', price: 380, image: 'bracelet 1.jpg', description: 'Pearl strand bracelet' },
  { name: 'Bracelet 2',    category: 'bracelet', price: 380, image: 'bracelet 2.jpg', description: 'Tennis bracelet with pearls' },
  { name: 'Bracelet 3',    category: 'bracelet', price: 380, image: 'bracelet 3.jpg', description: 'Double strand bracelet' },
  { name: 'Bracelet 4',    category: 'bracelet', price: 380, image: 'bracelet 4.jpg', description: 'Charm bracelet' },
  { name: 'Bracelet 5',    category: 'bracelet', price: 380, image: 'bracelet 5.jpg', description: 'Minimalist pearl bracelet' },
  // Pendants
  { name: 'Pendant 1',     category: 'pendant',  price: 320, image: 'pend 1.jpg',    description: 'Teardrop pearl pendant' },
  { name: 'Pendant 2',     category: 'pendant',  price: 320, image: 'pend 2.jpg',    description: 'Cluster pearl pendant' },
  { name: 'Pendant 3',     category: 'pendant',  price: 320, image: 'pend 3.jpg',    description: 'Baroque pearl pendant' },
  { name: 'Pendant 4',     category: 'pendant',  price: 320, image: 'pend 4.jpg',    description: 'Solitaire pearl pendant' },
  { name: 'Pendant 5',     category: 'pendant',  price: 320, image: 'pend 5.jpg',    description: 'Drop pearl pendant' },
  // Earrings
  { name: 'Earring 1',     category: 'earring',  price: 290, image: 'earring 1.jpg', description: 'Pearl stud earrings' },
  { name: 'Earring 2',     category: 'earring',  price: 290, image: 'earring 2.jpg', description: 'Dangling pearl earrings' },
  { name: 'Earring 3',     category: 'earring',  price: 290, image: 'earring 3.jpg', description: 'Hoop pearl earrings' },
  { name: 'Earring 4',     category: 'earring',  price: 290, image: 'earring 4.jpg', description: 'Baroque pearl drops' },
  { name: 'Earring 5',     category: 'earring',  price: 290, image: 'earring 5.jpg', description: 'Cluster pearl studs' },
];

async function seed() {
  await Product.deleteMany({});          // clear old data first
  await Product.insertMany(sampleProducts);
  console.log('✅ Database seeded with', sampleProducts.length, 'products!');
  mongoose.disconnect();
}

seed().catch(console.error);

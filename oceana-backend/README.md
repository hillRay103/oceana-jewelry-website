# OCEANA Jewelry Store — MongoDB Backend
## Complete Setup Guide (Step by Step)

---

## 📦 STEP 1: Install MongoDB on your laptop

1. Go to: https://www.mongodb.com/try/download/community
2. Choose **Windows → MSI** → Download
3. Run the installer → click Next → choose "Complete"
4. ✅ Check "Install MongoDB as a Service" (it will run automatically)
5. After install, open **Command Prompt** and type:
   ```
   mongod --version
   ```
   If you see a version number, MongoDB is installed correctly!

---

## 📁 STEP 2: Set up the project

Put your files like this:
```
your-folder/
├── oceana-backend/     ← this folder (the backend)
│   ├── server.js
│   ├── seed.js
│   ├── .env
│   ├── models/
│   └── routes/
└── Iweb/
    └── web/            ← your existing HTML/CSS files
```

---

## 📥 STEP 3: Install Node.js packages

Open **Command Prompt** inside the `oceana-backend` folder:
```
cd oceana-backend
npm install
```
This installs: express, mongoose, cors, dotenv

---

## 🌱 STEP 4: Seed the database (add sample products)

```
node seed.js
```
You'll see: ✅ Database seeded with 20 products!

---

## 🚀 STEP 5: Start the server

```
node server.js
```
You'll see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:3000
```

---

## 🧪 STEP 6: Test with these URLs in your browser

| Action | URL |
|---|---|
| Health check | http://localhost:3000/api/health |
| All products | http://localhost:3000/api/products |
| Only rings | http://localhost:3000/api/products?category=ring |
| All orders | http://localhost:3000/api/orders |
| All messages | http://localhost:3000/api/contacts |

---

## 🔌 STEP 7: Connect your frontend

Copy this JavaScript into any HTML page to use the API:

```javascript
// LOAD products from database
fetch('http://localhost:3000/api/products?category=ring')
  .then(res => res.json())
  .then(products => console.log(products));

// SAVE a contact form submission
fetch('http://localhost:3000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Sara',
    email: 'sara@example.com',
    message: 'I love your jewelry!'
  })
}).then(res => res.json()).then(data => console.log(data));
```

---

## 📋 All API Endpoints (CRUD Summary)

### Products
| Method | URL | What it does |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products?category=ring | Filter by category |
| GET | /api/products/:id | Get one product |
| POST | /api/products | Add new product |
| PUT | /api/products/:id | Edit a product |
| DELETE | /api/products/:id | Delete a product |

### Orders
| Method | URL | What it does |
|---|---|---|
| GET | /api/orders | Get all orders |
| GET | /api/orders/:id | Get one order |
| POST | /api/orders | Place new order |
| PUT | /api/orders/:id | Update status |
| DELETE | /api/orders/:id | Delete order |

### Contacts (Contact Form)
| Method | URL | What it does |
|---|---|---|
| GET | /api/contacts | Get all messages |
| GET | /api/contacts/:id | Get one message |
| POST | /api/contacts | Submit new message |
| PUT | /api/contacts/:id | Mark as read |
| DELETE | /api/contacts/:id | Delete message |

---

## 🗃️ MongoDB JSON Query Examples (for your exam)

```js
// Find all rings
db.products.find({ category: "ring" })

// Find products under $400
db.products.find({ price: { $lt: 400 } })

// Update a price
db.products.updateOne({ name: "Pearl Ring 1" }, { $set: { price: 500 } })

// Delete a product
db.products.deleteOne({ name: "Pearl Ring 1" })

// Insert a product
db.products.insertOne({ name: "New Ring", category: "ring", price: 300, image: "ring.jpg" })
```

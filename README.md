# 🌊 Oceana — Jewelry E-Commerce Website

Oceana is a full-stack jewelry e-commerce website that lets customers browse collections, view product details, manage a shopping cart, and complete checkout — built with a clean HTML/CSS/JS frontend and a Node.js/Express backend backed by MongoDB.

---

##  Features

- 💍 Browse jewelry products by category (rings, necklaces, earrings, bracelets)
- 🔍 Product detail pages with images, descriptions, and pricing
- 🛒 Add, update, and remove items from the shopping cart
- 💳 Checkout flow with order summary
- 📦 Order creation and tracking
- 📱 Fully responsive design for mobile and desktop

---

## Tech Stack

| Layer      | Technology                  |
|------------|------------------------------|
| Frontend   | HTML, CSS, JavaScript        |
| Backend    | Node.js, Express             |
| Database   | MongoDB                      |

---

##  Folder Structure

```
oceana/
├── frontend/
│   ├── index.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── cart.js
│       └── checkout.js
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   └── controllers/
│       ├── productController.js
│       ├── cartController.js
│       └── orderController.js
│
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Products
| Method | Endpoint             | Description                  |
|--------|-----------------------|-------------------------------|
| GET    | `/api/products`       | Get all products             |
| GET    | `/api/products/:id`   | Get a single product by ID    |
| POST   | `/api/products`       | Add a new product             |
| PUT    | `/api/products/:id`   | Update a product              |
| DELETE | `/api/products/:id`   | Delete a product              |

### Cart
| Method | Endpoint             | Description                  |
|--------|-----------------------|-------------------------------|
| GET    | `/api/cart`           | Get current cart items       |
| POST   | `/api/cart`           | Add item to cart             |
| PUT    | `/api/cart/:id`       | Update item quantity          |
| DELETE | `/api/cart/:id`       | Remove item from cart         |

### Orders
| Method | Endpoint             | Description                  |
|--------|-----------------------|-------------------------------|
| GET    | `/api/orders`         | Get all orders               |
| GET    | `/api/orders/:id`     | Get a single order by ID      |
| POST   | `/api/orders`         | Create a new order            |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd oceana

# Install backend dependencies
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Run the Project

```bash
# Start the backend server
npm start

# Open frontend/index.html in your browser
``

## 🚀 Future Improvements

- User authentication and account management
- Payment gateway integration
- Product reviews and ratings
- Admin dashboard for inventory management


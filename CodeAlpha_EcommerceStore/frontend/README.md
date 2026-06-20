## ShopEase - E-Commerce Store

A full-stack E-Commerce web application built using React, Node.js, Express.js, and MongoDB Atlas.

## Features

### Authentication
- User Registration
- User Login & Logout
- JWT Authentication
- Protected Routes
- Welcome User Display

### Products
- Product Listing
- Product Search
- Product Details Page
- Product Images

### Shopping Cart
- Add to Cart
- Remove from Cart
- Increase Quantity
- Decrease Quantity
- Dynamic Cart Counter
- Dynamic Total Price
- Persistent Cart using Local Storage

### Orders
- Order Processing
- Checkout Functionality
- Order Success Page
- Order History Page
- Order Status Tracking

### User
- User Profile Page

---

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Context API
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

```text
CodeAlpha_EcommerceStore/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Routes

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Products

```http
GET /api/products
GET /api/products/:id
```

### Orders

```http
POST /api/orders
GET /api/orders/:userId
```

---

## CodeAlpha Task Coverage

### Task 1: Simple E-Commerce Store

Implemented Features:

- ✅ Shopping Cart
- ✅ Product Details Page
- ✅ Order Processing
- ✅ User Registration/Login
- ✅ Database Integration
- ✅ Quantity Management
- ✅ Order History
- ✅ User Profile
- ✅ Protected Routes

---

## Author

### Gundu Praneetha

Computer Science Student | Exploring Technology & Innovation

📧 Email: praneetha1435@gmail.com

🔗 GitHub: https://github.com/PraneethaGundu

---

## License

This project was developed as part of the CodeAlpha Full Stack Development Internship Program.
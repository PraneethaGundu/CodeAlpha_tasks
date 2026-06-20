require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
  name: "Laptop",
  price: 65000,
  image:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  description: "High-performance laptop",
  },
  {
    name: "Smartphone",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    description: "Latest smartphone",
  },
  {
    name: "Headphones",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "Premium headphones",
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedProducts();
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/*
  PLACE ORDER
*/
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      items,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      userId,
      items,
      totalPrice,
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

/*
  GET USER ORDERS
*/
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
// controllers/orderController.js
const Order = require("../models/OrderModel");

exports.userOrders = async (req, res) => {
  const userId = req.session.user.id;
  const orders = await Order.getByUser(userId);
  res.render("orders/myorders", { orders });
};

exports.allOrders = async (req, res) => {
  const orders = await Order.getAll();
  res.render("orders/all", { orders });
};

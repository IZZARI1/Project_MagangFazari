const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");
const orderController = require("../controllers/orderController");

// ✅ User: lihat pesanan pribadi
router.get(
  "/myorders",
  isLoggedIn,
  requireRole(["user"]),
  orderController.userOrders
);

// ✅ Admin/Superadmin: lihat semua pesanan
router.get(
  "/orders",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  orderController.allOrders
);

module.exports = router;

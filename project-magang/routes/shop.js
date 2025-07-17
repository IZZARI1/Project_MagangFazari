const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");
const shopController = require("../controllers/shopController");

// Halaman belanja kopi
router.get(
  "/shop",
  isLoggedIn,
  requireRole(["user"]),
  shopController.getShopPage
);

// Proses pembelian
router.post(
  "/shop/buy/:productId",
  isLoggedIn,
  requireRole(["user"]),
  shopController.buyProduct
);

// Halaman pesanan user
router.get(
  "/myorders",
  isLoggedIn,
  requireRole(["user"]),
  shopController.getMyOrders
);

// Hapus pesanan user
router.post(
  "/myorders/delete/:id",
  isLoggedIn,
  requireRole(["user"]),
  shopController.deleteMyOrder
);

module.exports = router;

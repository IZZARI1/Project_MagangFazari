const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");
const productController = require("../controllers/productController");

// Lihat semua produk
router.get(
  "/",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.list
);

// Form tambah
router.get(
  "/add",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.formAdd
);

// Proses tambah
router.post(
  "/add",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.add
);

// Form edit
router.get(
  "/edit/:id",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.formEdit
);

// Proses edit
router.post(
  "/edit/:id",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.update
);

// Hapus produk
router.get(
  "/delete/:id",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  productController.delete
);

module.exports = router;

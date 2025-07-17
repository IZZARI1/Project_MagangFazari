const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");
const dashboardController = require("../controllers/dashboardController");

// Redirect sesuai role
router.get("/dashboard", isLoggedIn, dashboardController.redirectByRole);

// Dashboard Superadmin
router.get(
  "/dashboard/superadmin",
  isLoggedIn,
  requireRole(["superadmin"]),
  dashboardController.superadminDashboard
);

// Dashboard Admin
router.get(
  "/dashboard/admin",
  isLoggedIn,
  requireRole(["admin", "superadmin"]),
  dashboardController.adminDashboard
);

// Dashboard User
router.get(
  "/dashboard/user",
  isLoggedIn,
  requireRole(["user"]),
  dashboardController.userDashboard
);

module.exports = router;

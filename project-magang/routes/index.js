const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Login & logout
router.get("/login", userController.showLogin);
// router.get("/login", (req, res) =>
//   res.render("login", {
//     // error: "Email atau password salah.",
//     recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
//   })
// );
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// Sign up
router.get("/signup", userController.signupForm);
router.post("/signup", userController.signup);

module.exports = router;

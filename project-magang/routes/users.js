const express = require("express");
const router = express.Router();
const { isLoggedIn, isSuperAdmin } = require("../middleware/auth");
const userController = require("../controllers/userManagementController");

router.use(isLoggedIn);
router.use(isSuperAdmin);

router.get("/", userController.list);
router.get("/add", userController.formAdd);
router.post("/add", userController.add);
router.get("/edit/:id", userController.formEdit);
router.post("/edit/:id", userController.update);
router.get("/delete/:id", userController.delete);

module.exports = router;

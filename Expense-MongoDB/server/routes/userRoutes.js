const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
router.post("/user/forgotpassword", userController.forgotpassword);

module.exports = router;

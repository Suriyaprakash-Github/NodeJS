const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/user/signup", userController.signup);

module.exports = router;

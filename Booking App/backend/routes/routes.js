const express = require("express");
const router = express.Router();
const userController = require("../controllers/controller");

router.get("/getUsers", userController.getAppointments);

router.get("/deleteUser", userController.deleteUser);

router.post("/users/createUser", userController.postNewUser);

router.get("/", userController.getAppointmentPage);

module.exports = router;

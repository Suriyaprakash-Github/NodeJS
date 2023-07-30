const express = require("express");
const router = express.Router();
const PasswordResetCOntroller = require("./../controllers/passwordResetController");

router.get(
  "/password/resetpassword/:id",
  PasswordResetCOntroller.resetpassword
);
router.post("/password/updatepassword", PasswordResetCOntroller.updatePassword);
module.exports = router;

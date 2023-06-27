const express = require("express");
const router = express.Router();
const premiumController = require("./../controllers/premiumControllers");
const authUser = require("./../middlewares/userAuth");

router.get("/premium/leaderboard", premiumController.leaderboard);
router.get(
  "/downloadexpense",
  authUser.authenticate,
  premiumController.download
);

module.exports = router;

const express = require("express");
const router = express.Router();
const premiumController = require("./../controllers/premiumControllers");

router.get("/premium/leaderboard", premiumController.leaderboard);

module.exports = router;

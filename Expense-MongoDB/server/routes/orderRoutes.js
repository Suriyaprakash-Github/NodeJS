const express = require("express");
const router = express.Router();
const orderContrller = require("./../controllers/orderControllers");
const authUser = require("./../middlewares/userAuth");

router.post("/order/premium", orderContrller.purchasePremiun);
router.post("/order/updatepremium", orderContrller.updatePremium);
module.exports = router;

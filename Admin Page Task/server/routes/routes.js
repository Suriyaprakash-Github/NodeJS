const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/product/newProduct", productController.postNewProduct);

router.get("/product/getProduct", productController.getProducts);

router.post("/product/deleteProduct", productController.deleteProduct);

module.exports = router;

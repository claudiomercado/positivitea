const express = require("express");
const router = express.Router();
const path = require("path");
const productsControllers = require("../../controllers/productsControllers");


router.get("/allProducts", productsControllers.allProducts);
router.get("/productDetail", productsControllers.productDetail);
router.get("/shoppingCart", productsControllers.shoppingCart);


module.exports = router;
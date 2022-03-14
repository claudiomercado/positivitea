const express = require("express");
const router = express.Router();
const path = require("path");
const productsControllers = require("../controllers/productsControllers");


router.get("/", productsControllers.products);
router.get('/create',productsControllers.create)
router.post('/create',productsControllers.save)
router.get('/edit/:id',productsControllers.edit)
router.put('/update',productsControllers.update)
router.get('/listProduct',productsControllers.list)
router.get("/productDetail/:id", productsControllers.productDetail);
router.get("/shoppingCart", productsControllers.shoppingCart);


module.exports = router;
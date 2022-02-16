const express = require ('express')
const router = express.Router()
const productDetailControllers = require ('../controllers/productControllers')

router.get('/detailProduct', productDetailControllers.detail)

module.exports=router
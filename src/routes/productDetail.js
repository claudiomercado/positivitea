const express = require ('express')
const router = express.Router()
const productDetailControllers = require ('../controllers/productControllers.js')

router.get('/detailProduct', productDetailControllers.detail)

module.exports=router
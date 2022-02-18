const express = require ('express')
const router = express.Router()
const homeControllers = require ('../controllers/homeControllers.js')
const productDetailControllers = require ('../controllers/productControllers.js')

router.get('/', homeControllers.index)

router.get('/product', productDetailControllers.detail)

module.exports=router
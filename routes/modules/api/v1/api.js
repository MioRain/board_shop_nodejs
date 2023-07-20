const express = require('express')
const productController = require('../../../../controllers/api/product-controller')
const categoryController = require('../../../../controllers/api/category-controller')
const router = express.Router()

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.get('/categories', categoryController.getCategories)

module.exports = router
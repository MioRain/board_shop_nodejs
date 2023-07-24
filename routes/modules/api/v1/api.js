const express = require('express')
const { authenticated, authenticatedSeller } = require('../../../../middleware/api-auth')
const passport = require('../../../../config/passport')
const userController = require('../../../../controllers/api/user-controller')
const buyerController = require('../../../../controllers/api/buyer-controller')
const sellerController = require('../../../../controllers/api/sellerController')
const productController = require('../../../../controllers/api/product-controller')
const categoryController = require('../../../../controllers/api/category-controller')
const router = express.Router()

router.post('/signin', passport.authenticate('local', { session: false }), userController.postSignIn)
router.post('/signup', userController.postSignUp)
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
router.get('/categories', categoryController.getCategories)
router.post('/buyer/orders', authenticated, buyerController.postOrders)
router.get('/seller/products', authenticated, authenticatedSeller, sellerController.getProducts)

module.exports = router
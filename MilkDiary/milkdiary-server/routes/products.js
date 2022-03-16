const express = require('express')
const router = express.Router()
const {
    getProducts,
    addProduct,
    getByID,
    deleteCustomer,
} = require('../controllers/products')

router.route('/').post(addProduct).get(getProducts)
router.route('/:id').get(getByID)

module.exports = router

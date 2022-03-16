const express = require('express')
const router = express.Router()
const {
    addCustomer,
    getCustomers,
    getByID,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customers')

router.route('/').post(addCustomer).get(getCustomers)
router.route('/:id').delete(deleteCustomer)
router.route('/edit/:id').get(getByID).put(updateCustomer)
module.exports = router

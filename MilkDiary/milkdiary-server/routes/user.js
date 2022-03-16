const express = require('express')
const router = express.Router()
const {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    getByLocation,
    getUserById,
    getByName,
    addOrder,
} = require('../controllers/user')

router.route('/').get(getUsers).post(addUser)
router.route('/:id').delete(deleteUser).put(updateUser).get(getUserById)
router.route('/location/:name').get(getByLocation)
router.route('/login/:name').get(getByName)
router.route('/order/:id').post(addOrder)
module.exports = router

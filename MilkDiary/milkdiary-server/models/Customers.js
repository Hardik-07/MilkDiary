const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Name'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Email'],
    },
    contact: {
        type: Number,
        trim: true,
        required: [true, 'Please Enter Contact'],
    },
    status: {
        type: String,
        trim: true,
        required: [true, 'Please Enter current status of user'],
    },
    orders: {
        type: Array,
        trim: true,
    },
    dairyID: {
        type: String,
        trim: true,
        required: [true, 'Please add dairy id'],
    },
})

module.exports = mongoose.model('Customers', CustomerSchema)

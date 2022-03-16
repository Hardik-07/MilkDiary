const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Name'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Description'],
    },
    cost: {
        type: Number,
        trim: true,
        required: [true, 'Please Enter Cost'],
    },
    image: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Image String'],
    },
    quantity: {
        type: Number,
        trim: true,
        required: [true, 'Please Enter the quantity of items'],
    },
})

module.exports = mongoose.model('Products', ProductSchema)

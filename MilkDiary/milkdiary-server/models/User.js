const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Pleaser Enter a name'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Pleaser enter an email'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Pleaser enter a password'],
    },
    role: {
        type: String,
        trim: true,
        required: [true, 'Please enter a role'],
    },
    orders: {
        type: Array,
        trim: true,
        required: [false],
    },
})

module.exports = mongoose.model('User', UserSchema)

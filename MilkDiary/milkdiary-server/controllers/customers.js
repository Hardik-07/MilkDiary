const Customers = require('../models/Customers')

//@desc add a Customer
//@route POST /api/v1/customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customers.find()
        return res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'server error',
        })
    }
}

//@desc get a particular customer
//@route GET /api/v1/customers/edit/:id
exports.getByID = async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'No Such Customer',
            })
        }
        return res.status(200).json({
            success: true,
            data: customer,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'server error',
        })
    }
}

//@desc add a Customer
//@route POST /api/v1/customers
exports.addCustomer = async (req, res) => {
    try {
        const customer = await Customers.create(req.body)
        return res.status(201).json({
            success: true,
            data: customer,
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((val) => val.message)
            res.status(400).json({
                success: false,
                error: messages,
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error',
            })
        }
    }
}

//@desc update a Customer
//@route PUT /api/v1/customers/edit/:id
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer Not Found',
            })
        }
        await Customers.updateOne({ _id: req.params.id }, req.body)
        return res.status(200).json({
            success: true,
            data: {},
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        })
    }
}

//@desc update a Customer
//@route PUT /api/v1/customers/:id
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'User Not Found',
            })
        }
        await customer.delete()
        return res.status(200).json({
            success: true,
            data: customer,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        })
    }
}

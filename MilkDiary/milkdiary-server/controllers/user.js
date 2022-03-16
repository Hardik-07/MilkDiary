const User = require('../models/User')

//@desc get all users data
//@route GET /api/v1/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'server error',
        })
    }
}

//@desc add a user
//@route POST /api/v1/users
exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json({
            success: true,
            data: user,
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

//@desc update user details
//@route POST /api/v1/users/:id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User Not Found',
            })
        }
        await User.updateOne({ _id: req.params.id }, req.body)
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

exports.addOrder = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User Not Found',
            })
        }
        await User.updateOne(
            { _id: req.params.id },
            {
                $push: {
                    orders: req.body,
                },
            }
        )
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

//@desc delete a user
//@route POST /api/v1/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User Not Found',
            })
        }
        await user.delete()
        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No Such User',
            })
        }
        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        })
    }
}

//@dec get users by location
//@route GET /api/v1/users/location:name
exports.getByLocation = async (req, res) => {
    try {
        const user = await User.find({ location: req.params.name })
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'users not found ',
            })
        }
        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
        })
    }
}

exports.getByName = async (req, res) => {
    try {
        const user = await User.find({ name: req.params.name })
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'users not found ',
            })
        }
        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
        })
    }
}

// const employee = await Employees.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         error: "No such employee found",
//       });
//     }
//     await Department.updateOne(
//       { name: employee.department },
//       {
//         $inc: {
//           numberOfEmployees: -1,
//         },
//       }
//     );
//     await Institute.updateOne(
//       { name: employee.institute },
//       {
//         $inc: {
//           numberOfEmployees: -1,
//         },
//       }
//     );

//     await employee.remove();
//     return res.status(200).json({
//       success: true,
//       data: {},
//     });

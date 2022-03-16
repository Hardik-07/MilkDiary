const Products = require("../models/Products");

//@desc get all products
//@route POST /api/v1/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//@desc add a Customer
//@route POST /api/v1/products
exports.addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

//@dec get users by name
//@route GET /api/v1/users/product:name
exports.getByID = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found ",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

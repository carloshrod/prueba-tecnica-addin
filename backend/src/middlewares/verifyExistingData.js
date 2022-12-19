const { userModel } = require("../models/user.model");
const { productModel } = require("../models/product.model");

exports.verifyExistingUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const foundUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (foundUser) {
            return res.status(400).json({ msg: "Username or email already exists!" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyExistingProduct = async (req, res, next) => {
    try {
        const { productName } = req.body;
        const foundProduct = await productModel.findOne({ productName });
        if (foundProduct) {
            return res.status(400).json({ msg: "Product already exists!" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
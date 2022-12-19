const { productModel } = require("../models/product.model");
const { uploadImage, deleteFileFromCloud } = require("../utils/cloudinary");

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = new productModel(req.body);

        if (req.files?.file) {
            const { file } = req.files;
            const result = await uploadImage(file, newProduct)
            newProduct.setProductImage({ public_id: result.public_id, secure_url: result.secure_url })
        }

        const savedProduct = await newProduct.save();
        return res.status(201).json({savedProduct , msg: "Product created successfully!"});
    } catch (error) {
        next(error);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const foundProducts = await productModel.find()
        if (foundProducts?.length > 0) {
            return res.status(200).send(foundProducts);
        }
        return res.send({ msg: "No data found in database!" });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const { productId } = req.params;
        const productToEdit = await productModel.findOne({ _id: productId });

        if (req.files) { // Update productImage
            const { file } = req.files;
            const result = await uploadImage(file, productToEdit)
            data.productImage = { public_id: result.public_id, secure_url: result.secure_url }
        }

        await productToEdit.updateOne({ $set: data });
        const updatedProducts = await productModel.find();
        return res.status(200).send({ updatedProducts, msg: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productModel.findOneAndDelete({ _id: productId });

        if (deletedProduct === null) return res.sendStatus(400);

        if (deletedProduct?.productImage?.public_id) {
            await deleteFileFromCloud(deletedProduct.productImage.public_id);
        }

        return res.status(200).send({ msg: "Product deleted successfully!" });
    } catch (error) {
        next(error);
    }
}

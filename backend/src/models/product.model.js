const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        productImage: {
            public_id: String,
            secure_url: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

productSchema.methods.setProductImage = function setProductImage(result) {
    this.productImage = result;
}

exports.productModel = mongoose.model("products", productSchema);

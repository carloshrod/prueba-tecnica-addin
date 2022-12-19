const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const { config } = require('../config');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = config.CLOUD

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
    secure: true
})

const uploadFileToCloud = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, { folder: 'product-images' });
};
exports.uploadFileToCloud;

const deleteFileFromCloud = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};
exports.deleteFileFromCloud = deleteFileFromCloud;

exports.uploadImage = async (image, product) => {
    if (product.productImage.public_id) { 
        await deleteFileFromCloud(product.productImage.public_id);
    }
    const result = await uploadFileToCloud(image.tempFilePath);
    await fs.unlink(image.tempFilePath);
    return result;
};

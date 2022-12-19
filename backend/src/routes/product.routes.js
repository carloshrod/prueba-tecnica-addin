const { Router } = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { fileUpload } = require('../middlewares/fileUpload');
const { verifyExistingProduct } = require('../middlewares/verifyExistingData');

const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.post('/', [fileUpload, verifyExistingProduct], createProduct);
productRoutes.put('/:productId', fileUpload, updateProduct);
productRoutes.delete('/:productId', deleteProduct);

exports.productRoutes = productRoutes;
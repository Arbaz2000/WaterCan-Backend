const express = require('express')
const router = express.Router();

const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/productController');

// Register a driver
// ? Working
router.post('/addNewProduct', addProduct);
router.get('/getAllProducts', getAllProducts);
router.delete('/products/:productId', deleteProduct);
router.put('/products/:productId', updateProduct);

module.exports=router;
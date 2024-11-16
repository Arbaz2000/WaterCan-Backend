const express = require('express')
const router = express.Router();

const { addProduct, getAllProducts } = require('../controllers/productController');

// Register a driver
// ? Working
router.post('/addNewProduct', addProduct);
router.get('/getAllProducts', getAllProducts);




module.exports=router;
const express = require('express')
const router = express.Router();
const { login,register } = require('../controllers/auth');

const {createUser,getUserById,updateUser,deleteUser,verifyUserCredentials, addProductForUser, getProductsForUser, updateProductForUser, deleteProductForUser, forgotPassword} = require('../controllers/userController');
const { getAllProducts, addProduct } = require('../controllers/productController');

// Create a new User
router.post('/users', createUser);

// Get a User by ID
router.get('/users/:id', getUserById);

// Update a User by ID
router.put('/users/:id', updateUser);

// Delete a User by ID
router.delete('/users/:id', deleteUser);

// Add product
// router.post('/products',addProduct);
// router.get('/allproducts',getAllProducts)
router.post('/users/verify', verifyUserCredentials);
router.post('/users/passwordChanged', forgotPassword);

router.get('/users/:userId/products',getProductsForUser)
router.post('/users/:userId/products',addProductForUser)
router.put('/users/:userId/products/:productId',updateProductForUser)
router.delete('/users/:userId/products/:productId',deleteProductForUser)




router.route("/login").post(login);
router.route("/register").post(register);

module.exports=router;
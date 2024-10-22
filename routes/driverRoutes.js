const express = require('express')
const router = express.Router();

const {createDriver,getDriverById,verifyDriverCredentials,getAllDrivers} = require('../controllers/driverController');

// Register a driver
router.post('/new-driver', createDriver);

// Get a Driver by ID
router.get('/driver/:id', getDriverById);
router.get('/get-drivers',getAllDrivers)


router.post('/verify-driver', verifyDriverCredentials);


module.exports=router;
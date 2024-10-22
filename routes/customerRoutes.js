const express = require('express');
const router = express.Router();
const {createCustomer,getAllCustomers,updateDueAmt,getCustomerById,updateCustomer,deleteCustomer} = require('../controllers/customerController');

// Create a new customer
// router.post('/customers', createCustomer);
router.post('/customers/to/:userId', createCustomer);
router.post('/get-customers',getAllCustomers);


// Get a customer by ID
router.get('/customers/:id', getCustomerById);

// Update a customer by ID
router.put('/update-customer/:customerId', updateCustomer);

// Delete a customer by ID
router.delete('/delete-customer/:customerId', deleteCustomer);

//update due amount
router.post('/customers/:id/due-amount-update',updateDueAmt)

module.exports = router;

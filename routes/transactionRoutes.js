const express = require('express')
const router = express.Router();

const {createTransaction,transactionHistory,customerTransactions} = require('../controllers/transactionController');


// Create a new transcation
router.post('/transaction/:userId', createTransaction);


//Get All Transaction
// !500 Internal Server Error The server has encountered a situation it does not know how to handle.
router.get('/transaction-history/:userId',transactionHistory);

// !500 Internal Server Error The server has encountered a situation it does not know how to handle.
router.get('/transaction/:userId/:customerId',customerTransactions);

// router.post('/transaction/send-email',generateEmailToCustomer);
// Get a Transaction by ID
// router.get('/transaction/:id', getTransactionById);


module.exports=router;

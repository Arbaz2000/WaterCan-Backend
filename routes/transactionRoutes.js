const express = require('express')
const router = express.Router();

const {createTransaction,transactionHistory,customerTransactions} = require('../controllers/transactionController');


// Create a new transcation
router.post('/transaction/:userId', createTransaction);
//Get All Transaction
router.get('/transaction-history/:userId',transactionHistory);
router.get('/transaction/:userId/:customerId',customerTransactions);

// router.post('/transaction/send-email',generateEmailToCustomer);
// Get a Transaction by ID
// router.get('/transaction/:id', getTransactionById);







module.exports=router;
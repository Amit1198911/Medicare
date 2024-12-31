const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller.js');


// Create a new transaction
router.post('/', transactionController.createTransaction);

// Generate financial report
router.get('/', transactionController.getAllTransactions);




module.exports = router;

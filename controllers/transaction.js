const transaction = require('../database/models/transaction.js');
const transactionService = require('../services/transaction.js');

const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({error: 'Transaction not found'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const updateTransaction = async (req, res) => {
    try {
        const {description, amount, date, userId, categoryId} = req.body;
        if (!amount && !date && !userId && !categoryId) {
            res.status(500).json({error: "No data was provided"});
        }else{
            const transaction = await transactionService.updateTransaction(req.params.id, req.body);
            if (transaction) {
                res.status(200).json(transaction);
            } else {
                res.status(404).json({error: 'Transaction not found'});
            }
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransaction(req.params.id);
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({error: 'Transaction not found'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {getTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction};


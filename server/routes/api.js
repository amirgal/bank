const express = require('express')
const router = express.Router()
const Transaction = require('../models/TransactionModel')  //if we work with DB

router.get('/transactions', async function(req,res) {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction', function(req,res) {
    const transaction = req.body
    const Trans = new Transaction(transaction)
    Trans.save()
    res.end()
})

router.delete('/transaction/:id', async function(req,res) {
    const {id} = req.params
    console.log(id);
    await Transaction.findOneAndDelete({_id:id})
    res.end()
})

module.exports = router
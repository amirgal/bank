const express = require('express')
const router = express.Router()
const Transaction = require('../models/TransactionModel') 
const User = require('../models/UserModel') 

router.get('/transactions', async function(req,res) {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction/:userid', async function(req,res) {
    const transaction = req.body
    const {userid} = req.params
    const trans = new Transaction(transaction)
    await trans.save()
    await User.findOneAndUpdate({_id:userid},{ $push: { transactions: trans } })
    res.end()
})

router.delete('/transaction/:transid', async function(req,res) {
    const {transid} = req.params
    await Transaction.findOneAndDelete({_id:transid})
    res.end()
})

//user managment
router.get('/user/:username', async function(req,res) {
    const {username} = req.params
    const user = await User.find({username}).populate('transactions')
    res.send(user)
})

router.post('/newuser', async function(req,res) {
    const user = req.body
    const newUser = new User(user)
    await newUser.save()
    res.send(newUser)
})

module.exports = router
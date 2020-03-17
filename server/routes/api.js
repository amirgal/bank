const express = require('express')
const router = express.Router()
const Transaction = require('../models/TransactionModel') 
const User = require('../models/UserModel') 

router.get('/transactions', async function(req,res) {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction', async function(req,res) {
    const transaction = new Transaction(req.body)
    await transaction.save()
    await User.findOneAndUpdate({_id: transaction.userId},{ $push: { transactions: transaction } })
    res.end()
})

router.delete('/transaction/:transid/:userId', async function(req,res) {
    const {transid,userId} = req.params
    await User.findOneAndUpdate({_id:userId}, {$pull:{transactions: transid }})
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
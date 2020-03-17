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

router.delete('/transaction/:userid/:transid', async function(req,res) {
    const {transid,userid} = req.params
    const user = await User.findById(userid)
    user.transactions = user.transactions.filter(t => t.id !== transid)
    await User.findOneAndUpdate({ _id: userid }, { transactions: user.transactions });
    await Transaction.findOneAndDelete({_id:transid})
    res.end()
})

//user managment
router.get('/user/:username', async function(req,res) {
    const {username} = req.params
    const user = await User.find({username}).populate('transactions')
    res.send(user)
})

router.post('/newuser', function(req,res) {
    const user = req.body
    console.log(user)
    const newUser = new User(user)
    newUser.save()
    res.end()
})

module.exports = router
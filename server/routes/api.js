const express = require('express')
const router = express.Router()
const Transaction = require('../models/TransactionModel') 
const User = require('../models/UserModel') 


router.post('/transaction', async function(req,res) {
    const transaction = new Transaction(req.body)
    await transaction.save()
    await User.findOneAndUpdate({_id: transaction.userId},{ $push: { transactions: transaction } })
    res.send(transaction)
})

router.delete('/transaction/:transid/:userId', async function(req,res) {
    const {transid,userId} = req.params
    await User.findOneAndUpdate({_id:userId}, {$pull:{transactions: transid }})
    res.end()
})

router.post('/user', async function(req,res){
    const user = req.body
    const response = await User.find({username: user.username}).populate('transactions')
    const data = {userId:null, message:''}
    if(response.length === 0){
        data.message = 'Wrong username or password'
    }else if(response[0].password === user.password){
        data.userId = response[0]._id
    } else {
        data.message = 'Wrong username or password'
    }
    res.send(data)
})

router.post('/newuser', async function(req,res) {
    const user = req.body
    const newUser = new User(user)
    await newUser.save()
    res.send(newUser._id)
})

router.get('/transactions/:userId', async function(req,res) {
    const {userId} = req.params
    const response = await User.find({_id: userId}).populate('transactions')
    res.send(response[0].transactions)
})

module.exports = router
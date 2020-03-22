const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')

const app = express()
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Bank", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static(path.join(__dirname, 'build'))); //for heroku

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', api)

app.get('*', function (req, res) { //for heroku
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 4000
app.listen(process.env.PORT || port, function () {
    console.log(`Running server on port ${port}`)
})
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './style/App.css';
import {Transactions, Operations, Breakdown, MyAppBar, Login, Footer, Logo} from './components'
const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      userId: localStorage.userId || '',
      userName: localStorage.userName || '',
      userTransactions: []
    }
  }

  login = async (user) => {
    try{
      const response = await axios.post('http://localhost:4000/user', user)
      if(response.data.userId){
        const userId = response.data.userId
        const userName = user.username
        localStorage.userId = userId
        localStorage.userName = userName
        const userTransactions = await this.getUserTransactions(userId)
        this.setState({userId, userTransactions, userName})
        return true
      }else {
        alert(response.data.message)
        return false
      }
    }catch(err){
      console.log(err)
    }
  }
  
  signUp = async (user) => {
    try{
      const response = await axios.post(`http://localhost:4000/newuser`,user)
      const userId = response.data
      const userName = user.username
      localStorage.userId = userId
      localStorage.userName = userName
      this.setState({userId,userName})
    }catch(err){
      console.log(err)
    }
  }

  getUserTransactions = async (userId) => {
    const res = await axios.get(`http://localhost:4000/transactions/${userId}`)
    return res.data
  }

  async componentDidMount() {
    const userTransactions = await this.getUserTransactions(this.state.userId)
    this.setState({userTransactions})
  }


  deleteTransaction = async (transId) => {
    await axios.delete(`http://localhost:4000/transaction/${transId}/${this.state.userId}`)
    const userTransactions = this.state.userTransactions.filter(t => t._id !== transId)
    this.setState({userTransactions})
  }

  getBalance = () => {
    let balance = 0
    this.state.userTransactions.forEach(t => balance += t.amount)
    return balance
  }

  newTransaction = async (t) => {
    t.userId = this.state.userId
    const response = await axios.post("http://localhost:4000/transaction",t)
    const transaction = response.data
    const userTransactions = [...this.state.userTransactions]
    userTransactions.push(transaction)
    this.setState({userTransactions})
  }

  render() {

    return (
      <Router > 
        <Route path="/" exact render={() => 
          <Fragment>
            <Logo />
            <Login login={this.login} signUp={this.signUp}/>
          </Fragment>
        }/>
        <Route path="/transactions" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Transactions"}/> 
              <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.userTransactions}/>
              <Footer username={this.state.userName} balance={this.getBalance()} />
            </Fragment>
        }/>
        <Route path="/operations" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Operations"}/> 
              <Operations newTransaction={this.newTransaction} balance={this.getBalance()}/>
              <Footer username={this.state.userName} balance={this.getBalance()} />
            </Fragment>
          }/>
        <Route path="/breakdown" exact render={() => 
          <Fragment>
            <MyAppBar headline={"Breakdown"}/> 
            <Breakdown transactions={this.state.userTransactions}/>
            <Footer username={this.state.userName} balance={this.getBalance()} />
          </Fragment>
        }/>
      </Router> 
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './style/App.css';
import {Transactions, Operations, Breakdown, MyAppBar} from './components'
import Login from './components/Login';
const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      user:{},
    }
  }

  

  login = async (user) => {
    try{
      const response = await axios.post('http://localhost:4000/user', user)
      const currUser = response.data[0]
      this.setState({user:currUser})
    }catch(err){
      alert(err.message)
    }
  }

  signUp = async (user) => {
    try{
    const response = await axios.post(`http://localhost:4000/newuser`,user)
    const currUser = response.data
    this.setState({user:currUser},function(){console.log(this.state.user)})
    }catch(err){
      console.log(err.message)
    }
  }


  // async componentWillMount() {
  //   try{
  //     const result = await this.getUser(this.state.user.username)
  //     this.setState({user:result.data},function(){console.log(this.state.user)})
  //   }catch(err){
  //     console.log(err.message)
  //   }
  // }

  deleteTransaction = async (transId) => {
    await axios.delete(`http://localhost:4000/transaction/${transId}/${this.state.user._id}`)
    const transactions = this.state.user.transactions.filter(t => t._id !== transId)
    const user = {...this.state.user,transactions}
    this.setState({user})
  }

  getBalance = (transactions) => {
    let balance = 0
    transactions.forEach(t => balance += t.amount)
    return balance
  }

  newTransaction = async (t) => {
    t.userId = this.state.user._id
    const response = await axios.post("http://localhost:4000/transaction",t)
    const transaction = response.data
    const user = {...this.state.user}
    user.transactions.push(transaction)
    this.setState({user})
  }

  render() {

    return (
      <Router > 
        <Route path="/" exact render={() => <Login login={this.login} signUp={this.signUp}/>}></Route>
        <Route path="/transactions" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Transactions"}/> 
              <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.user.transactions}/>
            </Fragment>
        }/>
        <Route path="/operations" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Operations"}/> 
              <Operations newTransaction={this.newTransaction} balance={this.getBalance(this.state.user.transactions)}/>
            </Fragment>
            }/>
        <Route path="/breakdown" exact render={() => 
          <Fragment>
            <MyAppBar headline={"Breakdown"}/> 
            <Breakdown transactions={this.state.user.transactions}/>
          </Fragment>
        }/>
      </Router> 
    );
  }
}

export default App;

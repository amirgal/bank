import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './style/App.css';
import {Transactions, Operations, Breakdown, MyAppBar, Login, Footer, Logo} from './components'
const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      user:JSON.parse(localStorage.currUser) || {},
    }
  }

  

  login = async (user) => {
    try{
      const response = await axios.post('http://localhost:4000/user', user)
      if(response.data.user){
        const currUser = response.data.user
        this.setState({user:currUser})
        // localStorage.currUser = JSON.stringify(currUser)
        localStorage.currUser = JSON.stringify(user)
        return true
      } else {
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
    const currUser = response.data
    localStorage.currUser = JSON.stringify(currUser)
    this.setState({user:currUser})
    }catch(err){
      console.log(err)
    }
  }


  // componentWillMount() {
  //   const user = JSON.parse(localStorage.currUser)
  //   this.setState({user})
  // }

  // componentWillUnmount() {
  //   localStorage.currUser = JSON.stringify(this.state.user)
  // }

  deleteTransaction = async (transId) => {
    await axios.delete(`http://localhost:4000/transaction/${transId}/${this.state.user._id}`)
    const transactions = this.state.user.transactions.filter(t => t._id !== transId)
    const user = {...this.state.user,transactions}
    this.setState({user})
  }

  getBalance = () => {
    let balance = 0
    this.state.user.transactions.forEach(t => balance += t.amount)
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
        <Route path="/" exact render={() => 
          <Fragment>
            <Logo />
            <Login login={this.login} signUp={this.signUp}/>
          </Fragment>
        }/>
        <Route path="/transactions" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Transactions"}/> 
              <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.user.transactions}/>
              <Footer username={this.state.user.username} balance={this.getBalance()} />
            </Fragment>
        }/>
        <Route path="/operations" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Operations"}/> 
              <Operations newTransaction={this.newTransaction} balance={this.getBalance(this.state.user.transactions)}/>
              <Footer username={this.state.user.username} balance={this.getBalance()} />
            </Fragment>
          }/>
        <Route path="/breakdown" exact render={() => 
          <Fragment>
            <MyAppBar headline={"Breakdown"}/> 
            <Breakdown transactions={this.state.user.transactions}/>
            <Footer username={this.state.user.username} balance={this.getBalance()} />
          </Fragment>
        }/>
      </Router> 
    );
  }
}

export default App;

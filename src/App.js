import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import './style/App.css';
import {Transactions, Operations, Breakdown, MyAppBar} from './components'
import Login from './components/Login';

const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      users:[],
      transactions:[]
    }
  }
  
  login = (user) => {
    user._id = this.getRandomId()
    const users = [...this.state.users].push(user)
    this.setState({users})
  }

  async getTransactions() {
    return axios.get("http://localhost:4000/transactions")
  }

  async componentDidMount() {
    const response = await this.getTransactions()   
    this.setState({ transactions: response.data})
  }

  deleteTransaction = (id) => {
    axios.delete(`http://localhost:4000/transaction/${id}`)
    const transactions = this.state.transactions.filter(t => t._id != id)
    this.setState({transactions})
  }

  getBalance = (transactions) => {
    let balance = 0
    transactions.forEach(t => balance += t.amount)
    return balance
  }

  getRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  newTransaction = (t) => {
    t._id = this.getRandomId()
    axios.post("http://localhost:4000/transaction",t)
    const transactions = [...this.state.transactions,t]
    this.setState({transactions})
  }

  render() {
    
    return (
      <Router > 
        <Route path="/" exact render={() => <Login login={this.login}/>}></Route>
        <Route path="/transactions" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Transactions"}/> 
              <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.transactions}/>
            </Fragment>
        }/>
        <Route path="/operations" exact render={() => 
            <Fragment>
              <MyAppBar headline={"Operations"}/> 
              <Operations newTransaction={this.newTransaction} balance={this.getBalance(this.state.transactions)}/>
            </Fragment>
            }/>
        <Route path="/breakdown" exact render={() => 
          <Fragment>
            <MyAppBar headline={"Breakdown"}/> 
            <Breakdown transactions={this.state.transactions}/>
          </Fragment>
        }/>
      </Router> 
    );
  }
}

export default App;

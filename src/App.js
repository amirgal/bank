import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './style/App.css';
import {Transactions, Operations, Breakdown, MyAppBar} from './components'

const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions:[],
      balance:0,
      path:'Transactions'
    }
  }
  
  async getTransactions() {
    return axios.get("http://localhost:4000/transactions")
  }

  async componentDidMount() {
    const response = await this.getTransactions()   
    const balance = this.getBalance(response.data) 
    this.setState({ transactions: response.data, balance })
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
  getRandomId () {
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
        <MyAppBar path={this.state.path}/>   
        <Route path="/" exact render={() => 
            <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.transactions}/>}
        />
        <Route path="/operations" exact render={() => <Operations newTransaction={this.newTransaction}/>}/>
        <Route path="/breakdown" exact render={() => <Breakdown transactions={this.state.transactions}/>}/>
      </Router> 
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom'
import './App.css';
import {Transactions, Operations, Breakdown} from './components'
import {AppBar, Button} from '@material-ui/core'

const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions:[],
      balance:0
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
        <div id="header">
          <Link to="/"><Button variant="contained" color="primary">Transactions</Button></Link>
          <Link to="/operations"><Button variant="contained" color="primary">Operations</Button></Link>
          <Link to="/breakdown"><Button variant="contained" color="primary">Breakdown</Button></Link>
          Balance: {this.getBalance(this.state.transactions)}
        </div>
        
        
        <Route path="/" exact render={() => 
            <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.transactions}/>}/>
        <Route path="/operations" exact render={() => <Operations newTransaction={this.newTransaction}/>}/>
        <Route path="/breakdown" exact render={() => <Breakdown transactions={this.state.transactions}/>}/>
      </Router>
       
    );
  }
}



export default App;

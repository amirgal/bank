import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link, Redirect} from 'react-router-dom'
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Breakdown from './components/Breakdown';
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

  async componentDidUpdate() {
    const response = await this.getTransactions()    
    const balance = this.getBalance(response.data) 
    this.setState({ transactions: response.data, balance })
  }

  deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:4000/transaction/${id}`)
  }

  getBalance = (transactions) => {
    let balance = 0
    transactions.forEach(t => balance += t.amount)
    return balance
  }

  newTransaction = async(t) => {
    axios.post("http://localhost:4000/transaction",t)
  }

  render() {
    
    return (
      <Router >
        <div id="header">
          <Link to="/"><h4>Transactions</h4></Link>
          <Link to="/operations"><h4>Operations</h4></Link>
          <Link to="/breakdown"><h4>Breakdown</h4></Link>
          <h4>Balance: {this.state.balance}</h4>
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

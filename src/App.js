import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom'
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
const axios = require('axios');

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [
        { amount: 3200, vendor: "Elevation", category: "Salary",id:0 },
        { amount: -7, vendor: "Runescape", category: "Entertainment",id:1 },
        { amount: -20, vendor: "Subway", category: "Food",id:2 },
        { amount: -98, vendor: "La Baguetterie", category: "Food",id:3 }
      ]
      
    }
  }

  async getUsers() {
    // return axios.get("https://jsonplaceholder.typicode.com/users")
  }

  async componentDidMount() {
    // const response = await this.getUsers()
    // this.setState({ users: response.data })
  }

  deleteTransaction = (id) => {
    const transactions = [...this.state.transactions]
    transactions.splice(transactions.findIndex(t => t.id == id),1)
    this.setState({transactions})
  }

  getBalance = () => {
    const sum = 0
    this.state.transactions.forEach(t => sum += t.amount)
    return sum
  }

  newTransaction = (t) => {
    const transactions = [...this.state.transactions]
    t.id = 4
    transactions.push(t)
    this.setState({transactions})
  }

  render() {

    return (
      <Router >
        <div id="header">
          <Link to="/"><h4>Transactions</h4></Link>
          <Link to="/operations"><h4>Operations</h4></Link>
          <h4>Balance: <p>{this.getBalance}</p></h4>
        </div>
        <Route path="/" exact render={() => 
            <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.transactions}/>}/>
        <Route path="/operations" exact render={() => <Operations newTransaction={this.newTransaction}/>}/>
      </Router>
       
    );
  }
}



export default App;

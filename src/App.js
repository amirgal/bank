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
      transactions:[],
      balance:0
      
    }
  }

  async getTransactions() {
    return axios.get("http://localhost:4000/transactions")
  }

  async componentDidMount() {
    const response = await this.getTransactions()    
    this.setState({ transactions: response.data })
  }

  async componentDidUpdate() {
    const response = await this.getTransactions()    
    this.setState({ transactions: response.data })
  }

  deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:4000/transaction/${id}`)
    console.log('deleted');
  }

  getBalance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += t.amount)
    this.setState({balance})
  }

  newTransaction = (t) => {
    axios.post("http://localhost:4000/transaction",t)
  }

  render() {
    return (
      <Router >
        <div id="header">
          <Link to="/"><h4>Transactions</h4></Link>
          <Link to="/operations"><h4>Operations</h4></Link>
          <h4>Balance: <p>{this.state.balance}</p></h4>
        </div>
        <Route path="/" exact render={() => 
            <Transactions deleteTransaction={this.deleteTransaction} transactions={this.state.transactions}/>}/>
        <Route path="/operations" exact render={() => <Operations newTransaction={this.newTransaction}/>}/>
      </Router>
       
    );
  }
}



export default App;

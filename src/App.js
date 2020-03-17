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
      user:{transactions:[]},
    }
  }
  
  login = async (user) => {
    let result
    try{
      result = await axios.get(`http://localhost:4000/user/${user.name}`)
    }catch(err){
      console.log(err.message)
    }
  }

  signUp = async (user) => {
    const response = await axios.post(`http://localhost:4000/newuser`,user)
    const currUser = response.data
    this.setState({user:currUser},function(){console.log(this.state.user)})
  }

  getUser(username) {
    return axios.get(`http://localhost:4000/user/${username}`)
  }
 
  // async componentDidMount() {
  //   debugger
  //   const response = await this.getUser(this.state.user.username)   
  //   this.setState({ user: response.data})
  // }

  deleteTransaction = (id) => {
    axios.delete(`http://localhost:4000/transaction/${id}`)
    const transactions = this.state.user.transactions.filter(t => t._id !== id)
    const user = {...this.state.user,transactions}
    this.setState({user})
  }

  getBalance = (transactions) => {
    let balance = 0
    transactions.forEach(t => balance += t.amount)
    return balance
  }

  getRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  newTransaction = async (t) => {
    // t._id = this.getRandomId()
    t.userId = this.user._id
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

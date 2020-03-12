import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amount:'',
            vendor:'',
            category:''
        }
    }
    
    handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        this.setState({[id]:val})
    }

    newTransaction = (e) => {
        const sign = e.target.className == 'deposit-btn' ? 1 : -1
        this.props.newTransaction({
            amount: this.state.amount*sign,
            vendor: this.state.vendor,
            category: this.state.category
        })
    }

    render() {
       
        return (
            <div id="operations">
                <input type="number" id="amount" value={this.state.amount} placeholder="enter amount" onChange={this.handleInput}/>
                <input type="text" id="vendor" value={this.state.vendor} placeholder="enter vendor" onChange={this.handleInput}/>
                <input type="text" id="category" value={this.state.category} placeholder="enter category" onChange={this.handleInput}/>
                <Link to="/" ><button className="deposit-btn" onClick={this.newTransaction}>Deposit</button></Link>
                <Link to="/" ><button className="withdraw-btn" onClick={this.newTransaction}>Withdraw</button></Link>
            </div>
        )
    }
}

export default Operations
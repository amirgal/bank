import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'
import { List, ListItem, Button, Divider } from '@material-ui/core';

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
        const sign = e.target.innerText == 'DEPOSIT' ? 1 : -1
        if(sign == -1 && this.state.amount > this.props.balance){
            alert('Not enough funds')
            return
        }
        this.props.newTransaction({
            amount: this.state.amount*sign,
            vendor: this.state.vendor,
            category: this.state.category
        })
        window.location.href='/transactions'
    }

    render() {
        return (
            <form autoComplete="off" noValidate id="operations-form" >
                <List>
                    <ListItem>
                        <TextField id="amount" label="Amount" type="number" min="0.01" value={this.state.amount} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="vendor" label="Vendor" variant="standard" type="text" value={this.state.vendor} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="category" label="Category" variant="standard" type="text" value={this.state.category} onChange={this.handleInput}/>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Button color="primary" variant="contained" onClick={this.newTransaction}>Deposit</Button>
                        <Button color="secondary" variant="contained" onClick={this.newTransaction}>Withdraw</Button>
                    </ListItem>
                </List>
            </form>
            // <div id="operations">
            //     <input type="number" id="amount" value={this.state.amount} placeholder="enter amount" onChange={this.handleInput}/>
            //     <input type="text" id="vendor" value={this.state.vendor} placeholder="enter vendor" onChange={this.handleInput}/>
            //     <input type="text" id="category" value={this.state.category} placeholder="enter category" onChange={this.handleInput}/>
            //     <button className="deposit-btn" onClick={this.newTransaction}>Deposit</button>
            //     <button className="withdraw-btn" onClick={this.newTransaction}>Withdraw</button>
            // </div>
        )
    }
}

export default Operations
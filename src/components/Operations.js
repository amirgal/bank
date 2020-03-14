import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'
import { List, ListItem, Button, Divider } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amount:'',
            vendor:'',
            category:'',
            date: ''
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    {/* <ListItem>
                    <KeyboardDatePicker
                        margin="normal" id="date" label="Date" value={this.state.date}
                        format="MM/dd/yyyy" value={this.state.date} onChange={this.handleInput} 
                        KeyboardButtonProps={{'aria-label': 'change date',}}
                    />
                    </ListItem> */}
                </List>
            </form>
            </MuiPickersUtilsProvider>
        )
    }
}

export default Operations
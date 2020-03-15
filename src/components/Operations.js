import React, {Component} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
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
            <form autoComplete="off" noValidate className="form" >
                <List>
                    <ListItem>
                        <TextField id="amount" className="textfield" label="Amount" type="number" value={this.state.amount} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="vendor" className="textfield" label="Vendor" type="text" value={this.state.vendor} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="category" className="textfield" label="Category" type="text" value={this.state.category} onChange={this.handleInput}/>
                    </ListItem>
                    <Divider id="divider"/>
                    <ListItem id="btns-list-item">
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
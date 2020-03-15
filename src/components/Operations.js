import React, {Component} from 'react';
import {MySnackBar} from './'
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amount:'',
            vendor:'',
            category:'',
            date: new Date(),
            warn:false
        }
    }
    
    handleInput = (e) => {
        if(e == null) {return}        //in case user inputs nothing
        let val
        let id
        if(!e.target){
            id = 'date'
            val = e
        } else {
            val = e.target.value
            id = e.target.id
        }
        this.setState({[id]:val})
    }

    newTransaction = (e) => {
        const sign = e.target.innerText == 'DEPOSIT' ? 1 : -1
        if(sign == -1 && this.state.amount > this.props.balance){
            // alert('Not enough funds')
            this.setState({warn:true})
            return
        }
        this.props.newTransaction({
            amount: this.state.amount*sign,
            vendor: this.state.vendor,
            category: this.state.category,
            date: this.state.date
        })
        window.location.href='/transactions'
    }
    openSnackBar = () => {
        
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form autoComplete="off" noValidate className="form" >
                <List>
                    <ListItem>
                        <TextField id="amount" className="inputfield" label="Amount" type="number" value={this.state.amount} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="vendor" className="inputfield" label="Vendor" type="text" value={this.state.vendor} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField id="category" className="inputfield" label="Category" type="text" value={this.state.category} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <KeyboardDatePicker className="inputfield"
                            margin="normal" id="date" label="Date" value={this.state.date}
                            format="MM/dd/yyyy" value={this.state.date} onChange={this.handleInput} 
                            KeyboardButtonProps={{'aria-label': 'change date',}}
                        />
                    </ListItem>
                    <Divider id="divider"/>
                    <ListItem id="btns-list-item">
                        <Button color="primary" variant="contained" onClick={this.newTransaction}>Deposit</Button>
                        <Button color="secondary" variant="contained" onClick={this.newTransaction}>Withdraw</Button>
                    </ListItem>
                </List>
            </form>
            <MySnackBar warn={this.state.warn} openSnackBar={this.openSnackBar}/>
            </MuiPickersUtilsProvider>
        )
    }
}

export default Operations
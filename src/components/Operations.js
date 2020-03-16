import React, {Component} from 'react';
import {MySnackBar} from './'
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amount:'',
            vendor:'',
            category:'',
            date: new Date(),
            snackBar:{
                open:false,
                 text:'',
                 severity:''
                }
        }
    }
    
    handleInput = (e) => {
        if(e == null) {return}        //in case user inputs nothing to date
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

    validateInputs = t => {
        let snackBar
        let valid = true
        for(let k of Object.keys(t)) {
            if(t[k] === '' || t[k] === 0) {
                snackBar = {open:true, text:`Must Enter ${k}!`, severity:'error'}
                valid = false
                break
            }
        }
        if(valid && this.props.balance + t.amount < 0){
            snackBar = {open:true, text:`Insufficient Funds!`, severity:'error'}
            valid = false
        }
        this.setState({snackBar})
        return valid
    }

    newTransaction = (e) => {
        const sign = e.target.innerText === 'DEPOSIT' ? 1 : -1
        const t = {
            amount: this.state.amount*sign,
            vendor: this.state.vendor,
            category: this.state.category,
            date: this.state.date
        }
        if(this.validateInputs(t)){
            this.setState({snackBar:{open:true, text:'New Transaction Added',severity:'success'}})
            this.props.newTransaction(t)
        }
    }

    closeSnackBar = () => {
        const snackBar = {open:false}
        this.setState({snackBar})
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
                            margin="normal" id="date" label="Date"
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
            <MySnackBar open={this.state.snackBar.open} text={this.state.snackBar.text} closeSnackBar={this.closeSnackBar}/>
            </MuiPickersUtilsProvider>
        )
    }
}

export default Operations
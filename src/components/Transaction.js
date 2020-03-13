import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core'

class Transaction extends Component {

    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.transaction._id)
    }

    render() {
        const t = this.props.transaction
        const operation = t.amount > 0 ? 'deposit' : 'withdrawal'
        return (
            <div className={`transaction ${operation}`} >
                <p className="amount">Amount: {t.amount}</p>
                <p className="vendor">Vendor: {t.vendor}</p>
                <p className="category">Category: {t.category}</p>
                <Button variant="contained" className="delete-btn" onClick={this.deleteTransaction}>Delete</Button>
            </div>
        )
    }
}

export default Transaction
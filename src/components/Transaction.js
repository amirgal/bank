import React from 'react';
import {Button} from '@material-ui/core'


function Transaction(props) {

    const deleteTransaction = () => {
        props.deleteTransaction(props.transaction._id)
    }
    const t = props.transaction
    const operation = t.amount > 0 ? 'deposit' : 'withdrawal'
  

    return (
        <div className={`transaction ${operation}`} >
            <p className="amount">Amount: {t.amount}</p>
            <p className="vendor">Vendor: {t.vendor}</p>
            <p className="category">Category: {t.category}</p>
            <Button variant="contained" className="delete-btn" onClick={deleteTransaction}>Delete</Button>
        </div>
    ) 
}

export default Transaction
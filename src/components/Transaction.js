import React from 'react';
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

function Transaction(props) {

    const deleteTransaction = () => {
        props.deleteTransaction(props.transaction._id)
    }
    const t = props.transaction
    const operation = t.amount > 0 ? 'deposit' : 'withdrawal'
      
    return (
        <div className={`transaction ${operation}`} >
            <div className="transaction-info">
            <p className="amount">Amount: {t.amount}</p>
            <p className="vendor">Vendor: {t.vendor}</p>
            <p className="category">Category: {t.category}</p>
            <IconButton aria-label="delete" onClick={deleteTransaction}>
                <DeleteIcon fontSize="large"/>
            </IconButton>
            </div>
            <p className="transaction-date">{t.date}</p>
        </div>
    ) 
}

export default Transaction
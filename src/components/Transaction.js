import React from 'react';
import {Button, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

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
            {/* <Button variant="contained" onClick={deleteTransaction}>Delete</Button> */}
            <IconButton aria-label="delete" onClick={deleteTransaction}>
                <DeleteIcon fontSize="large"/>
            </IconButton>
        </div>
    ) 
}

export default Transaction
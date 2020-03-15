import React from 'react';
import {Transaction} from './';
import {Grid, Paper} from '@material-ui/core'

function Transactions(props) {

    const deleteTransaction = (id) => {
        props.deleteTransaction(id)
    }
    
    return (
        <div id="transactions">
            <Grid container direction="column" spacing={1} alignItems="center">
            {props.transactions.map(t => 
                <Grid item md={8} xs={11} className="transItem" key={t._id}>
                    <Paper elevation={3}>
                        <Transaction  transaction={t} deleteTransaction={deleteTransaction}/>
                    </Paper>
                </Grid>
                )}
            </Grid>
        </div>
    )
}


export default Transactions
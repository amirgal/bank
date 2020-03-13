import React from 'react';
import {Transaction} from './';
import {Grid, Paper} from '@material-ui/core'

function Transactions(props) {

    const deleteTransaction = (id) => {
        props.deleteTransaction(id)
    }

    return (
        <div id="transactions">
            <h3>Transactions</h3><hr/>
            <Grid container direction="column" spacing={1} alignItems="center">
            {props.transactions.map(t => 
                <Grid item xs={8} className="transItem" key={t._id}>
                    <Paper><Transaction  transaction={t} deleteTransaction={deleteTransaction}/></Paper>
                </Grid>
                )}
            </Grid>
        </div>
    )
}


export default Transactions
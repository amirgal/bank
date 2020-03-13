import React, {Component} from 'react';
import {Transaction} from './';
import {Grid, Paper} from '@material-ui/core'

class Transactions extends Component {

    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }

    render() {
        return (
            <div id="transactions">
                <h3>Transactions</h3><hr/>
                <Grid container direction="column" spacing={1} alignItems="center">
                {this.props.transactions.map(t => 
                    <Grid item xs={8} className="transItem" key={t._id}>
                    <Paper><Transaction  transaction={t} deleteTransaction={this.deleteTransaction}/></Paper>
                    </Grid>
                    )}
                </Grid>
            </div>
        )
    }
}

export default Transactions
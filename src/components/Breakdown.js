import React, {Component} from 'react';
import {Category} from './';
import { Grid,Paper } from '@material-ui/core';

class Breakdown extends Component {
    constructor() {
        super()
        this.state = {
            transByCategory:{}
        }
    }
    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }
    componentDidMount() {
        const transByCategory = {}
        this.props.transactions.forEach(t => {
            transByCategory[t.category] ?
                transByCategory[t.category] += t.amount :
                transByCategory[t.category] = t.amount
        });
        this.setState({transByCategory})
    }

    render() {
        
        return (
            <div id="transactions">
                <h3>Breakdown</h3>
                <Grid container direction="column" spacing={1} alignItems="center">
                {Object.keys(this.state.transByCategory).map(t => 
                    <Grid item xs={6} key={t}><Paper><Category category={t} amount={this.state.transByCategory[t]}/></Paper></Grid>
                    )}
                </Grid>
            </div>
        )
    }
}

export default Breakdown
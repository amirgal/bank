import React, {Component} from 'react';
import Transaction from './Transaction';

class Transactions extends Component {

    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }

    render() {
        return (
            <div id="transactions">
                <h3>Transactions</h3>
                {this.props.transactions.map(t => 
                    <Transaction key={t._id} transaction={t} deleteTransaction={this.deleteTransaction}/>
                    )}
            </div>
        )
    }
}

export default Transactions
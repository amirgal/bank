import React, {Component} from 'react';

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
                <button className="delete-btn" onClick={this.deleteTransaction}>Delete</button>
            </div>
        )
    }
}

export default Transaction
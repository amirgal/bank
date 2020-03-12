import React, {Component} from 'react';
import Category from './Category';

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
                {Object.keys(this.state.transByCategory).map(t => 
                    <Category category={t} amount={this.state.transByCategory[t]}/>
                    )}
            </div>
        )
    }
}

export default Breakdown
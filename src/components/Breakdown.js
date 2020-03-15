import React, {Component} from 'react';
import {MyExpansionPanel} from './';

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
                transByCategory[t.category].push(t) :
                transByCategory[t.category] = [t]
        });
        this.setState({transByCategory})
    }

    render() {
        return (
            <div id="breakdown">
                <MyExpansionPanel transByCategory={this.state.transByCategory}/>
            </div>
        )
    }
}

export default Breakdown
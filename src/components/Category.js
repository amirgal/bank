import React, {Component} from 'react';

class Category extends Component {

    render() {
        
        return (
            <div className="category-sum">
                <span>Category: {this.props.category}</span>
                <span>Total: {this.props.amount}</span>
            </div>
        )
    }
}

export default Category
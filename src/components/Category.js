import React, {Component} from 'react';

function Category(props) {  
    return (
        <div className="category-sum">
            <span>Category: {props.category}</span>
            <span>Total: {props.amount}</span>
        </div>
    )
}

export default Category
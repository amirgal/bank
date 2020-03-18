import React, { Fragment } from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
export default function Logo() {

    
    return (
        <Fragment>
        <div id="logo">
            <AccountBalanceIcon id="bank-logo"/>
            <h1>MY BANK</h1>
        </div>
        <div id="flipped-logo">
            <AccountBalanceIcon id="bank-logo"/>
            <h1>MY BANK</h1>
        </div>
        </Fragment>
    )
    
}


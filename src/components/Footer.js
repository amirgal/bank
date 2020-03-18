import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import { Typography } from '@material-ui/core';

export default function Footer(props) {

    return(
        <div id="footer">
            <div id="user"><PersonIcon />  <Typography variant="h6">{props.username}</Typography></div>
            <Typography variant="h6">Balance : {props.balance}</Typography>
        </div>
    )
}
import React, {Component} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            password : ''
        }
    }

    handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        this.setState({[id]:val})
    }

    login = () => {
        const user = {...this.state}
        this.props.login(user)
    }

    signUp = () => {
        const user = {...this.state}
        this.props.signUp(user)
    }

    render() {
        return (
            <form autoComplete="off" noValidate className="form" >
                <List>
                    <ListItem>
                        <TextField className="inputfield" id="username" label="Username" type="text" value={this.state.username} onChange={this.handleInput}/>
                    </ListItem>
                    <ListItem>
                        <TextField className="inputfield" id="password" label="Password" type="password" value={this.state.password} onChange={this.handleInput}/>
                    </ListItem>
                    <Divider id="divider" />
                    <ListItem id="btns-list-item">
                        <Button color="primary" variant="contained" onClick={this.login}>Login</Button>
                        <Button color="primary" variant="contained" onClick={this.signUp}><Link to="/transactions">Sign Up</Link></Button>
                    </ListItem>
                </List>
            </form>
        )
    }
}

export default Login
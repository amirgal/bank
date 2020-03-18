import React, {Component} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username : '',
            password : ''
        }
    }

    routeChange = (path) => {
        this.props.history.push(path);
    }

    handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        this.setState({[id]:val})
    }

    login = async () => {
        const user = {...this.state}
        await this.props.login(user)
        this.routeChange('/transactions')
    }

    signUp = async () => {
        const user = {...this.state}
        await this.props.signUp(user)
        this.routeChange('/transactions')
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
                        <Button color="primary" variant="contained" onClick={this.login}>LOGIN</Button>
                        <Button color="primary" variant="contained" onClick={this.signUp}>SIGN UP</Button>
                    </ListItem>
                </List>
            </form>
        )
    }
}

export default withRouter(Login)
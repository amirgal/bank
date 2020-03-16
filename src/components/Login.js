import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';

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
                        <Link to="/transactions"><Button color="primary" variant="contained" onClick={this.login}>Login</Button></Link>
                    </ListItem>
                </List>
            </form>
        )
    }
}

export default Login
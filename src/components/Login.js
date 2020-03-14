import React, {Component} from 'react';
import { Link } from '@material-ui/core';

class Login extends Component {

    
    render() {
        return (
            
            <button><Link to='/transactions'>Login</Link></button>
        )
    }
}

export default Login
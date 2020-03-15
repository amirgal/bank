import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from './DrawerMenu'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar(props) {
  const classes = useStyles();
  const history = useHistory()
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: !state.left });
  };
  
  return (
    <div className={classes.root} id="header">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={toggleDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
            {props.headline}
          </Typography>
          <Button color="inherit" onClick={()=>history.push('/')}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <DrawerMenu toggleDrawer={toggleDrawer} state={state}/>
    </div>
  );
}

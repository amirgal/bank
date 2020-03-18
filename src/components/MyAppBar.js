import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core'
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
    <div className={classes.root}>
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

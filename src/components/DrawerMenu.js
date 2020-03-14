import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Create as CreateIcon, CallSplit as CallSplitIcon, AccountBalance as AccountBalanceIcon} from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function DrawerMenu(props) {
  const classes = useStyles();
  const menuItems = [
    {text:'Transactions', link:'/transactions', icon:<AccountBalanceIcon />},
    {text:'Operations', link:'/operations', icon:<CreateIcon />},
    {text:'Breakdown', link:'/breakdown', icon:<CallSplitIcon />}
  ]
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer()}
      onKeyDown={props.toggleDrawer()}
    >
      <List>
        {menuItems.map(op => (
          <Link to={op.link} key={op.text}>
            <ListItem button >
              <ListItemIcon>{op.icon}</ListItemIcon>
              <ListItemText primary={op.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.state.left} onClose={props.toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  );
}

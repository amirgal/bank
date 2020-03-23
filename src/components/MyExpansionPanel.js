import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List,ListItem, ExpansionPanelSummary, ExpansionPanelDetails, Typography, ExpansionPanel} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function MyExpansionPanel(props) {
  const classes = useStyles();
  const transCategories = Object.keys(props.transByCategory)
  const sum = (category) => {
    return props.transByCategory[category].reduce((a, b) => a + (b['amount']), 0)
  }
  return (
    <div className={classes.root}>
      {transCategories.map(category => 
        <ExpansionPanel key={category} className='deposit'>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography className={classes.heading}>Category: {category} Total: {sum(category)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List id="expansion-panel-list">
            {props.transByCategory[category].map((t,i) => 
              <ListItem key={i}>
                <div className="breakdown-item">
                <p>{t.category} </p>
                <p>{t.vendor} </p>
                <p>{t.amount}</p>
                  </div>
              </ListItem>
              )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      )}
    </div>
  );
}

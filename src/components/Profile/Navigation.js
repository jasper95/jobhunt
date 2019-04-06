import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function MenuItem(props) {
  const { icon, label } = props
  return (
    <ListItem button>
      <ListItemIcon>
        <Icon children={icon}/>
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItem>
  )
}

function ProfileNavigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <MenuItem icon='work' label='Work Experience' />
        <MenuItem icon='school' label='Education' />
        <MenuItem icon='account_box' label='Skills' />
        <MenuItem icon='account_box' label='About Me' />
      </List>
    </div>
  );
}

ProfileNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileNavigation);

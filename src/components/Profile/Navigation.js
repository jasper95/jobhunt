import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
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
  const { icon, label, link } = props
  return (
    <ListItem button onClick={() => {
      Router.push(link)
    }}>
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
        <MenuItem icon='work' label='Work Experience' link='/profile/experience' />
        <MenuItem icon='school' label='Education' link='/profile/education' />
        <MenuItem icon='account_box' label='Skills' link='/profile/skill' />
        <MenuItem icon='account_box' label='About Me' link='/profile/about-me' />
      </List>
    </div>
  );
}

ProfileNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileNavigation);

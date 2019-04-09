import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

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

const ROLE_NAV = {
  USER: [
    {
      icon: 'work',
      label: 'Work Experience',
      link: '/profile/experience',
    },
    {
      icon: 'school',
      label: 'Education',
      link: '/profile/education',
    },
    {
      icon: 'account_box',
      label: 'Skills',
      link: '/profile/skill',
    },
    {
      icon: 'account_box',
      label: 'About Me',
      link: '/profile/about-me',
    }
  ],
  ADMIN: [
    {
      icon: 'domain',
      label: 'Profile',
      link: '/admin/profile',
    },
    {
      icon: 'work',
      label: 'Manage Jobs',
      link: '/admin/jobs',
    },
    {
      icon: 'supervisor_account',
      label: 'Manage Applications',
      link: '/admin/applications',
    },
  ],
}

function ProfileNavigation(props) {
  const { classes, user } = props;
  if (!user) {
    return null
  }
  const navItems = ROLE_NAV[user.role || 'USER']
  return (
    <div className={classes.root}>
      <List component="nav">
        {navItems.map(({ icon, label, link }) => (
          <MenuItem icon={icon} label={label} link={link} key={link} />
        ))}
      </List>
    </div>
  );
}

ProfileNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const navigationSelector = createSelector(
  state => state.auth,
  ({ user }) => ({
    user
  })
)

export default compose(
  withStyles(styles),
  connect(navigationSelector)
)(ProfileNavigation)

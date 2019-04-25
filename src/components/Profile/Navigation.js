import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

function MenuItem(props) {
  const { icon, label, link } = props
  return (
    <ListItem
      onClick={() => {
        Router.push(link)
      }}
      primaryText={label}
      rightIcon={<FontIcon children={icon}/>}
    />
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
    <div>
      <List>
        {navItems.map(({ icon, label, link }) => (
          <MenuItem icon={icon} label={label} link={link} key={link} />
        ))}
      </List>
    </div>
  );
}


const navigationSelector = createSelector(
  state => state.auth,
  ({ user }) => ({
    user
  })
)

export default compose(
  connect(navigationSelector)
)(ProfileNavigation)

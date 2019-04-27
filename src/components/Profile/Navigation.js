import React from 'react';
import Router, { withRouter } from 'next/router'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Button from 'react-md/lib/Buttons/Button'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

function MenuItem(props) {
  const { icon, label, link, active } = props
  return (
    <ListItem
      onClick={() => {
        Router.push(link)
      }}
      className='profileNavCard_menu_item'
      active={active}
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
    },
    {
      icon: 'insert_drive_file',
      label: 'Applications',
      link: '/profile/applications',
    },
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
  const { user, router } = props;
  if (!user) {
    return null
  }
  const displayName = [
    user.first_name,
    user.last_name,
    user.company && user.company.name
  ].filter(Boolean).join(' ')
  const navItems = ROLE_NAV[user.role || 'USER']
  return (
    <div className='profileNavCard'>
      <div className='profileNavCard_header'>
        <div className='avatar profileNavCard_header_avatar'>
          <div className='avatar_container'>
            <div className='avatar_circle'>
              <img src='/static/img/default-avatar.png' alt=""/>
            </div>
            <div className='avatar_edit'>
              <Button className='iBttn iBttn-primary' icon children='edit'/>
            </div>
          </div>
        </div>

        <div className='profileNavCard_header_greeting'>
          <h5>
            Welcome back, {displayName}
          </h5>

          <a href="#">
            edit profile
          </a>
        </div>

      </div>
      <div className='profileNavCard_content'>
        <List className='profileNavCard_menu'>
          {navItems.map(({ icon, label, link }) => (
            <MenuItem
              active={router.pathname === link}
              icon={icon}
              label={label}
              link={link}
              key={link} 
            />
          ))}
        </List>
      </div>
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
  withRouter,
  connect(navigationSelector)
)(ProfileNavigation)

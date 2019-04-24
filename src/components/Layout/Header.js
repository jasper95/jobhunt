import React, { useRef, useState } from 'react'
import Link from 'next/link';
import Paper from 'react-md/lib/Papers/Paper'
import Toolbar from 'react-md/lib/Toolbars/Toolbar'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton'
import Avatar from 'react-md/lib/Avatars/Avatar'
import Button from 'react-md/lib/Buttons/Button'

import { Logout } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Router from 'next/router'

const profileLink = {
  USER: '/profile/experience',
  ADMIN: '/admin/profile'
}

function Header(props) {
  const { isAuthenticated, dispatch, user } = props
  return (
    <Paper>
      <Toolbar>
        <Link href='/'>
          <Button flat>Home</Button>
        </Link>
        {isAuthenticated && (
          <MenuButton
            floating
            id='dropdown'
            menuItems={renderMenus()}
            anchor={{
              x: MenuButton.HorizontalAnchors.CENTER,
              y: MenuButton.VerticalAnchors.OVERLAP,
            }}
            position={MenuButton.Positions.TOP_LEFT}
          >
              <Avatar src="/static/img/default-avatar.png" />
          </MenuButton>
        )}
      </Toolbar>
    </Paper>
  );

  function renderMenus() {
    return [
      {
        primaryText: 'Profile',
        onClick: () => {
          Router.push(profileLink[user.role])
        }
      },
      {
        primaryText: 'Logout',
        onClick: () => {
          dispatch(Logout())
        }
      }
    ]
  }
}

const selector = createSelector(
  state => state.auth,
  (auth) => ({
    isAuthenticated: !!auth.user,
    user: auth.user
  })
)

export default connect(selector)(Header)

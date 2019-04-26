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

import 'sass/components/nav/index.scss'

const profileLink = {
  USER: '/profile/experience',
  ADMIN: '/admin/profile'
}

function Header(props) {
  const { isAuthenticated, dispatch, user } = props
  return (
    <nav className='nav'>
      <div className='nav_container'>
        <Link href='/'>
          <img 
            src='/static/img/logo.png' 
            alt=''
            className='nav_logo'
          />
        </Link>

        <div className='nav_actions'>
          <div className='nav_menu'>
            <ul className='nav_menu_list'>
              <li className='nav_menu_list_item'>
                <Link href="">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className='nav_profile'>
            {isAuthenticated ? (
              <MenuButton
                floating
                id='dropdown'
                className='nav_profile_avatarBtn'
                menuItems={renderMenus()}
                anchor={{
                  x: MenuButton.HorizontalAnchors.CENTER,
                  y: MenuButton.VerticalAnchors.OVERLAP,
                }}
                position={MenuButton.Positions.TOP_LEFT}
              >
                  <Avatar src="/static/img/default-avatar.png" />
              </MenuButton>
            ) : (
              <Button className='iBttn iBttn-primary nav_profile_login'>
                Login
              </Button>
            )
          }
          </div>
        </div>
      </div>
    </nav>


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

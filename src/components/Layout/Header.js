import React from 'react'
import Link from 'next/link';
import Button from 'react-md/lib/Buttons/Button'
import ImageLoader from 'components/ImageLoader'
import { Logout } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { ShowDialog } from 'redux/app/actions'
import { GetProfileData } from 'redux/profile/actions'
import authSelector from 'redux/auth/selector'
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Avatar from 'react-md/lib/Avatars/Avatar'
import ListItem from 'react-md/lib/Lists/ListItem'
import { createSelector } from 'reselect'

import 'sass/components/nav/index.scss'

function Header(props) {
  const {
    isAuthenticated, dispatch, user, avatarLink, profileLink
  } = props

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
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='nav_profile'>
            {renderProfileNav()}
          </div>
        </div>
      </div>
    </nav>
  );

  function renderProfileNav() {
    let profileNav = (
      <Link href='/login'>
        <Button flat className='iBttn iBttn-primary nav_profile_login'>
          Login
        </Button>
      </Link>
    )
    const { notifications = [] } = props
    if (isAuthenticated) {
      const displayName = [
        user.first_name,
        user.last_name,
        user.company && user.company.name
      ].filter(Boolean).join(' ')
      profileNav = (
        <>
          <div className='nav_profile_avatar'>
            <ImageLoader
              key={avatarLink}
              fallback='/static/img/default-avatar.png'
              src={avatarLink}
            />
          </div>
          <div className='nav_profile_content'>
            <p 
              className='name'
            >
              <Link href={profileLink}>
                <a>
                  {displayName}
                </a>
              </Link>
            </p>
            <p className='logout' 
              onClick={handleClickLogout}>
              Logout
            </p>
          </div>
          <DropdownMenu 
            id='notif'
            menuItems={notifications.map(e => (
              <ListItem
                key={e.id}
                leftAvatar={<Avatar suffix="blue" icon={<FontIcon>insert_drive_file</FontIcon>} />}
                rightIcon={<FontIcon children='info' />}
                primaryText={e.body.message}
              />
            ))}
            anchor={{
              x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
              y: DropdownMenu.VerticalAnchors.BOTTOM,
            }}
          >
            <Button icon children='notifications' onClick={handleGetNotification} className='nav_profile_notification' />
          </DropdownMenu>
        </>
      )
    }
    return profileNav
  }

  function handleClickLogout() {
    dispatch(ShowDialog({
      path: 'Confirm',
      props: {
        title: 'Confirm Logout',
        message: 'Do you really want to logout?',
        onValid: () => {
          dispatch(Logout())
        }
      }
    }))
  }

  function handleGetNotification() {
    dispatch(GetProfileData({
      key: 'notifications',
      url: '/user/notification'
    }))
  }
}

export default connect(createSelector(
  authSelector,
  state => state.profile.notifications,
  (auth, notifications) => ({
    ...auth,
    notifications
  })
))(Header)

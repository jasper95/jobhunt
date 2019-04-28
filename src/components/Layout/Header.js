import React, { useMemo } from 'react'
import Link from 'next/link';
import Button from 'react-md/lib/Buttons/Button'
import ImageLoader from 'components/ImageLoader'
import { getFileLink } from 'lib/tools'
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
  const { isAuthenticated, dispatch, user, isAdmin } = props

  const avatarLink = useMemo(() => {
    if (isAdmin) {
      const { company } = user
      return getFileLink({ type: 'avatar', node: 'company', id: company.id, updated: company.updated_date })
    } else if (user) {
      return getFileLink({ type: 'avatar', node: 'user', id: user.id, updated: user.updated_date })
    }
    return ''
  }, [user])

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
              onClick={() => {Router.push(profileLink[user.role])}}>
              {displayName}
            </p>
            <p className='logout' 
              onClick={() => {dispatch(Logout())}}>
              Logout
            </p>
          </div>
        </>
      )
    }
    return profileNav
  }
}

const selector = createSelector(
  state => state.auth,
  (auth) => ({
    isAuthenticated: Boolean(auth.user),
    user: auth.user
  })
)

export default connect(selector)(Header)

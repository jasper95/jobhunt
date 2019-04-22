import React, { useRef, useState } from 'react'
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Logout } from 'redux/auth/actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router'

const profileLink = {
  USER: '/profile/experience',
  ADMIN: '/admin/profile'
}

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isAuthenticated, dispatch, user } = props
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link href='/'>
          <Button>Home</Button>
        </Link>
        {isAuthenticated && (
          <>
            <IconButton
              aria-owns={isMenuOpen ? 'profile-menus' : undefined}
              aria-haspopup="true"
              onClick={(event) => {
                setIsMenuOpen(true)
                setAnchorEl(event.target)
              }}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src="/static/img/default-avatar.png"/>
            </IconButton>
            {renderMenus()}
          </>
        )}
      </Toolbar>
    </AppBar>
  );

  function renderMenus() {
    const menus = [
      {
        label: 'Profile',
        onClick: () => {
          setAnchorEl(null)
          setIsMenuOpen(false)
          Router.push(profileLink[user.role])
        }
      },
      {
        label: 'Logout',
        onClick: () => {
          setAnchorEl(null)
          setIsMenuOpen(false)
          dispatch(Logout())
        }
      }
    ]
    return (
      <Menu
        id='profile-menus'
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        {menus.map(({ label, onClick }) => (
          <MenuItem
            onClick={onClick}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    )
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

import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

// const useStyles = makeStyles({
//   bigAvatar: {
//     margin: 10,
//     width: 60,
//     height: 60,
//   },
//   appBar: {
//     position: 'relative',
//   },
//   toolbarTitle: {
//     flex: 1,
//   }
// });

function Header(props) {
  // const classes = useStyles();
  const { isAuthenticated } = props
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Company name
        </Typography>
        <Button>Home</Button>
        <Button>Search</Button>
        {isAuthenticated && (
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
        )}
      </Toolbar>
    </AppBar>
  );
}

const selector = createSelector(
  state => state.auth,
  (auth) => ({
    isAuthenticated: !!auth.user,
    user: auth.user
  })
)

export default connect(selector)(Header)

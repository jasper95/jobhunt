import React from 'react'
// import Grid from '@material-ui/core/Grid'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Page from 'components/Layout/Page'
import Navigation from './Navigation'

import 'sass/components/profile/index.scss'

function Profile(props) {
  const { children } = props
  return (
    <Page 
      className='profile'
      pageId='profile'>
      <div className='container'>
        <Grid>
          <Cell 
            size={3} 
            className='profile_navigation'>
            <Navigation />
          </Cell>
          <Cell
            size={9}
            className='profile_content'>
            {children}
          </Cell>
        </Grid>
      </div>
    </Page>
  )
}

export default Profile
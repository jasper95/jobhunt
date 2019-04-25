import React from 'react'
// import Grid from '@material-ui/core/Grid'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import Page from 'components/Layout/Page'
import Navigation from './Navigation'

function Profile(props) {
  const { children } = props
  return (
    <Page>
      <Grid>
        <Cell size={3}>
          <Navigation />
        </Cell>
        <Cell size={9}>
          {children}
        </Cell>
      </Grid>
    </Page>
  )
}

export default Profile
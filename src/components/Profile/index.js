import React from 'react'
import Grid from '@material-ui/core/Grid'
import Page from 'components/Layout/Page'
import Navigation from './Navigation'

function Profile(props) {
  const { children } = props
  return (
    <Page>
      <Grid container>
        <Grid item xs={3}>
          <Navigation />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Page>
  )
}

export default Profile
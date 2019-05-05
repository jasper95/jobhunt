import React, { useMemo } from 'react'
import Paper from 'react-md/lib/Papers/Paper';
import Error from 'next/error'
import draftToHtml from 'draftjs-to-html';
import parser from 'html-react-parser'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from 'components/Profile'
import withAuth from 'lib/hocs/auth'
import authSelector from 'redux/auth/selector'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import ImageLoader from 'react-image'
import Page from 'components/Layout/Page'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import api from 'lib/api'
import { extractDescription } from 'components/JobPosts/Post'
import {
  ShowDialog,
  Update
} from 'redux/app/actions'
import {
  SetUserAuth
} from 'redux/auth/actions'
import { getFileLink } from 'lib/tools'

function AdminProfile(props) {
  const { user, dispatch, errorCode } = props
  let { company } = props
  if (!company && user) {
    company = user.company
  }
  const description = useMemo(() => {
    if (company && Object.keys(company.description).length) {
      return draftToHtml(company.description)
    }
    return ('<div>No Description</div>')
  }, [company])
  console.log('description: ', description)
  const stringDescription = useMemo(() => {
    if (company) {
      return extractDescription(company.description)
    }
    return 'No Description Available'
  }, [company])
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  const children = (
    <Paper className='profileInfoCard'>
      <Grid>
        <Cell
          className='jobsPage_header_img' 
          size={2}
        >
          <div className='jobsPage_header_img_container'>
            <ImageLoader
              src={[getFileLink({ type: 'avatar', node: 'company', id: company.id }), '/static/img/default-avatar.png']}
            />
          </div>
        </Cell>
        <Cell
          className='jobsPage_header_content'
          size={10}
        >
          <h1 className='profileInfoCard_header'>
            <FontIcon children='location_city'/>
            <span className='title'>
              Company Profile
              {user && user.company_id === company.id && (
                <span className='action'>
                  <span 
                    className='action_item' 
                    onClick={handleUpdate}
                    children='Edit Profile'
                  />
                </span>
              )}
            </span>
          </h1>
          <Info label='Email' value={company.email} />
          <Info label='Contact Number' value={company.contact_number} />
        </Cell>
      </Grid>
      <Grid>
        <Cell size={12}>
          <Info
            label={`About ${company.name}`}
            value={(
              <div>
                {parser(description)}
              </div>
            )}
          />
        </Cell>
      </Grid>

    </Paper>
  )
  if (!user) {
    return (
      <Page
        pageTitle={company.name}
        pageDescription={stringDescription}
      >
        {children}
      </Page>
    )
  }
  return (
    <Profile
      pageTitle={company.name}
      pageDescription={stringDescription}
    >
      {children}
    </Profile>
  )

  function handleUpdate() {
    dispatch(ShowDialog({
      path: 'AdminProfile',
      props: {
        initialFields: company,
        title: 'Edit Company Profile',
        onValid: (data) => {
          dispatch(Update({
            data,
            node: 'company',
            sucessMessage: 'Company Profile successfull updated',
            callback: handleUpdateCallback
          }))
        }
      }
    }))
  }

  function handleUpdateCallback(company) {
    dispatch(SetUserAuth({
      ...user,
      company
    }))
  }
}

AdminProfile.getInitialProps = async(ctx) => {
  const { store, query } = ctx
  const { id } = query
  const { user } = store.getState().auth
  if (user && user.company && user.company.slug === id) {
    return { }
  }
  const company = await api({ url: `/company/${id}` }, ctx)
  if (!company) {
    return { errorCode: 404 }
  }
  return { company }
}

function Info({ label, value }) {
  return (
    <div className='infoField'>
      <p className='infoField_key'>{label}</p>
      <p className='infoField_value'>{value}</p>
    </div>
  )
}


export default compose(
  withAuth('optional'),
  connect(authSelector)
)(AdminProfile)

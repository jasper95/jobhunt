import React, { useMemo } from 'react'
import Page from 'components/Layout/Page'
import Paper from 'react-md/lib/Papers/Paper';
import Button from 'react-md/lib/Buttons/Button';
import { formatISOToDate, getFileLink } from 'lib/tools'
import draftToHtml from 'draftjs-to-html';
import { compose } from 'redux';
import withAuth from 'lib/hocs/auth';
import withDetailsPage from 'lib/hocs/detailsPage';
import { connect } from 'react-redux'
import authSelector from 'redux/auth/selector'
import ImageLoader from 'react-image'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import parser from 'html-react-parser'
import Router from 'next/router'
import Link from 'next/link'
import { extractDescription } from 'components/JobPosts/Post'
import {
  GetJobData
} from 'redux/job/actions'
import {
  ShowDialog,
  Create
} from 'redux/app/actions'
import { dataFormatter } from './admin/jobs'

import 'sass/pages/jobs.scss'

function JobDetail(props) {
  let { details: job, onEdit, dispatch } = props
  let { description } = job
  job = useMemo(() => ({
    ...formatISOToDate(job, ['end_date'], 'MMMM DD, YYYY'),
    description: draftToHtml(job.description),
  }), [job])
  const { user } = props
  const isAdminView = user && job.company_id === user.company_id
  const isApplied = !isAdminView && user && job.applicants.includes(user.id)
  const avatarSrc = getFileLink({ type: 'avatar', node: 'company', id: job.company_id })
  return (
    <Page
      pageId='jobs'
      className='jobsPage'
      pageTitle={job.name}
      pageDescription={extractDescription(description)}
    >
      <div className='container'>
        <Paper className='jobsPage_container'>
          <Grid className='jobsPage_header'>
            <Cell
              className='jobsPage_header_img' 
              size={2}
            >
              <div className='jobsPage_header_img_container'>
                <ImageLoader
                  src={[avatarSrc, '/static/img/default-avatar.png']}
                />
              </div>
            </Cell>
            <Cell
              className='jobsPage_header_content' 
              size={10}
            >
              <h1 className='jobsPage_header_job'>{job.name}</h1>
              <h2 className='jobsPage_header_company'>
                <Link href={`/company/${job.company.slug}`}>
                  <a>{job.company.name}</a>
                </Link>
              </h2>
              <p className='jobsPage_header_address'> {job.address} </p>
              <div className='jobsPage_header_actions'>
                {isAdminView && (
                  <Button 
                    className='iBttn iBttn-transparent' 
                    onClick={onEdit} 
                    children='Edit' 
                  />
                )}

                {!isAdminView && !isApplied && (
                  <Button 
                    className='iBttn iBttn-transparent' 
                    onClick={handleApply} 
                    children='Apply' 
                  />
                )}

                {isApplied && (
                  <p className='jobsPage_header_applied'>
                    Application submitted
                  </p>
                )}
              </div>
            </Cell>
          </Grid>

          <Grid className='jobsPage_information'>
            <Cell size={12}>
              <h5 className='jobsPage_information_label'>
                Deadline of Application
              </h5>
              <p className='jobsPage_information_desc'>{job.end_date}</p>
              <h5 className='jobsPage_information_label'>Job Details</h5>
              <p 
                className='jobsPage_information_desc' 
              >
                {parser(job.description)}
              </p>
            </Cell>
          </Grid>
        </Paper>
      </div>
    </Page>
  )

  function handleApply() {
    if (!user) {
      Router.push(`/login?return_url=${Router.pathname}/${job.slug}`)
      return
    }
    dispatch(ShowDialog({
      path: 'Application',
      props: {
        title: 'Make your pitch',
        onValid: createApplication
      }
    }))
  }

  function createApplication(data) {
    dispatch(Create({
      data: {
        ...data,
        user_id: user.id,
        job_id: job.id,
        company_id: job.company_id
      },
      node: 'application',
      sucessMessage: 'Application successfully submitted',
    }))
  }
}

const basePageProps = {
  node: 'job',
  reducer: 'job',
  detailsRequestAction: GetJobData,
  dataPropKey: 'details',
  dialogPath: 'Job',
  dialogProps: {
    fullWidth: true,
    maxWidth: 'lg'
  },
  pageName: 'Job',
  dataFormatter
}

export default compose(
  withAuth('optional'),
  withDetailsPage(basePageProps),
  connect(authSelector)
)(JobDetail)

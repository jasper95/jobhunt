import React, { useMemo } from 'react'
import Page from 'components/Layout/Page'
import Paper from 'react-md/lib/Papers/Paper';
import Typography from '@material-ui/core/Typography';
import Paper from 'react-md/lib/Buttons/Button';
import Avatar from 'react-md/lib/Avatars/Avatar'
import { formatISOToDate } from 'lib/tools'
import draftToHtml from 'draftjs-to-html';
import { compose } from 'redux';
import withAuth from 'lib/hocs/auth';
import withDetailsPage from 'lib/hocs/detailsPage';
import { connect } from 'react-redux'
import authSelector from 'redux/auth/selector'
import {
  GetJobData
} from 'redux/job/actions'
import {
  ShowDialog,
  Create
} from 'redux/app/actions'
import { dataFormatter } from './admin/jobs'

function JobDetail(props) {
  let { details: job, onEdit, dispatch } = props
  job = useMemo(() => ({
    ...formatISOToDate(job, ['end_date'], 'MMMM DD, YYYY'),
    description: draftToHtml(job.description),
  }), [job])
  const { user } = props
  const isAdminView = user && job.company_id === user.company_id
  const isApplied = !isAdminView && job.applicants.includes(user.id)
  return (
    <Page>
      <Paper>
        <Avatar alt="Remy Sharp" src="/static/img/default-company.png"/>
        <Typography variant='h3' children={job.name} />
        <Typography variant='h2' children={job.company.name} />
        <Typography variant='h4' children={job.address} />
        <Typography variant="caption" gutterBottom children='Deadline of Application:' />
        <Typography variant="caption" gutterBottom children={job.end_date} />
        <span>Details</span>
        <hr />
        <div dangerouslySetInnerHTML={{__html: job.description }} />
        {isAdminView && (
          <Button onClick={onEdit} children='Edit' />
        )}
        {isApplied && (
          <Typography variant='p' children='Application submitted'/>
        )}
        {!isAdminView && !isApplied && (
          <Button onClick={handleApply} children='Apply' />
        )}
      </Paper>
    </Page>
  )

  function handleApply() {
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

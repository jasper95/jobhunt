import React from 'react'
import Page from 'components/Layout/Page'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import api from 'lib/api'
import { formatISOToDate } from 'lib/tools'
import draftToHtml from 'draftjs-to-html';
// import {Editor, convertFromRaw, EditorState, convertToRaw} from 'draft-js';


function JobDetail(props) {
  const { job } = props
  console.log('job: ', job);
  // const job = {
  //   id: '1',
  //   name: 'Software Developer',
  //   address: 'Mandaue City, Cebu',
  //   expiry_date: 'December 31, 2019',
  //   details: 'Lorem ipsum',
  //   company: 'InternLink',
  //   company_img_url: '/static/img/default-company.png'
  // }
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
        <Button children='Apply' />
      </Paper>
    </Page>
  )
}

JobDetail.getInitialProps = async(ctx) => {
  let job = await api({
    url: `/job/${ctx.query.id}`
  }, ctx, false)
  // console.log('job', job)
  job = {
    ...formatISOToDate(job, ['end_date'], 'MMMM DD, YYYY'),
    description: draftToHtml(job.description)
  }
  return { job: formatISOToDate(job, ['end_date'], 'MMMM DD, YYYY') }
}


export default JobDetail
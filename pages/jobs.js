import React from 'react'
import Page from 'components/Layout/Page'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

function JobDetail(props) {
  const job = {
    id: '1',
    name: 'Software Developer',
    address: 'Mandaue City, Cebu',
    expiry_date: 'December 31, 2019',
    details: 'Lorem ipsum',
    company: 'InternLink',
    company_img_url: '/static/img/default-company.png'
  }
  return (
    <Page>
      <Paper>
        <Avatar alt="Remy Sharp" src="/static/img/default-company.png"/>
        <Typography variant='h3' children={job.name} />
        <Typography variant='h2' children={job.company} />
        <Typography variant='h4' children={job.address} />
        <Typography variant="caption" gutterBottom children='Deadline of Application:' />
        <Typography variant="caption" gutterBottom children={job.expiry_date} />
        <span>Details</span>
        <hr />
        {job.details}
        <Button children='Apply' />
      </Paper>
    </Page>
  )
}

export default JobDetail
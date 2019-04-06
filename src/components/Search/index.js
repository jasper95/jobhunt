import React from 'react'
import Card from '@material-ui/core/Card';
import useForm from 'lib/hooks/useForm'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const initialFields = {
  password: '',
  email: '',
  isShowPassword: false
}

function Search(props) {
  const [formState, formHandlers] = useForm({ initialFields })
  const {
    onElementChange,
    onChange
  } = formHandlers
  const { fields, errors } = formState

  return (
    <Card>
      <Typography color="textSecondary" gutterBottom>
        Search Criteria
      </Typography>
      <TextField
        id='title'
        label='Job Title'
        type='title'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        value={fields.title}
      />
      <br/>
      <TextField
        select
        id='location'
        label='Job Location'
        type='location'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        value={fields.location}
      />
      <br />
      <Button
        variant='contained'
        color='primary'
        // style={styleLoginButton}
        children='Search'
      />
    </Card>
  )
}

export default Search
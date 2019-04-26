import React from 'react'
import useForm from 'lib/hooks/useForm'
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import TextField from 'react-md/lib/TextFields/TextField'

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
      {/* <Typography color="textSecondary" gutterBottom>
        Search Criteria
      </Typography> */}
      <TextField
        id='title'
        label='Job Title'
        onChange={onElementChange}
        value={fields.title}
      />
      {/* <TextField
        select
        id='location'
        label='Job Location'
        type='location'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        value={fields.location}
      /> */}
      <br />
      <Button
        flat
        // style={styleLoginButton}
        children='Search'
      />
    </Card>
  )
}

export default Search
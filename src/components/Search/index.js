import React from 'react'
import useForm from 'lib/hooks/useForm'
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import TextField from 'react-md/lib/TextFields/TextField'


import 'sass/components/searchCard/index.scss'

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
    <Card className='searchCard'>
      <h1 className='searchCard_title'>
        Search Criteria
      </h1>

      <div className='searchCard_form'>
        <TextField
          className='iField'
          onChange={onElementChange}
          value={fields.title}
          label='Job Title'
          id='title'
        />
      </div>

      <Button
        className='iBttn iBttn-primary searchCard_searchBtn'
        children='Search'
        flat
      />

      {/* <Typography color="textSecondary" gutterBottom>
        Search Criteria
      </Typography> */}

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
    </Card>
  )
}

export default Search
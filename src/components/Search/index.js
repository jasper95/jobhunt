import React, { useMemo } from 'react'
import useForm from 'lib/hooks/useForm'
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import TextField from 'react-md/lib/TextFields/TextField'
import Select from 'react-select'
import { provinceOptions } from 'components/Dialogs/Job'

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
        <Select
          className='iField iField-rs'
          classNamePrefix='iField-rs'
          instanceId='province'
          isSearchable
          getOptionLabel={(e) => e.provDesc}
          value={useMemo(() => fields.province ? provinceOptions.find(e => e.provCode === fields.province) : '', [fields.province])}
          onChange={value => onChange('province', value.provCode)}
          options={provinceOptions}
        />
      </div>

      <Button
        className='iBttn iBttn-primary searchCard_searchBtn'
        children='Search'
        flat
      />
    </Card>
  )
}

export default Search
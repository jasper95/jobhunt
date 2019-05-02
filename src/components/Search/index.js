import React, { useMemo } from 'react'
import useForm from 'lib/hooks/useForm'
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import useFormOptions, { formOptionsSelector } from 'lib/hooks/useFormOptions'
import TextField from 'react-md/lib/TextFields/TextField'
import { createSelector } from 'reselect'
import authSelector from 'redux/auth/selector'
import Select from 'react-select'
import {
  GetJobData
} from 'redux/job/actions'
import { getAddressOptions, getAddressValue } from 'lib/tools'
import { connect } from 'react-redux'

import 'sass/components/searchCard/index.scss'

const initialFields = {
  keyword: '',
  province: '',
  job_category_id: ''
}

function Search(props) {
  const { dispatch, options, isAdmin } = props
  const [formState, formHandlers] = useForm({ initialFields })
  const {
    onElementChange,
    onChange
  } = formHandlers
  const { fields } = formState
  useFormOptions({ dispatch, options, optionKeys: [{ key: 'jobCategories' }] })
  return (
    <Card className='searchCard'>
      <h1 className='searchCard_title'>
        Search Criteria
      </h1>

      <div className='searchCard_form'>
        {isAdmin ? (
          <Select
            className='iField iField-rs'
            classNamePrefix='iField-rs'
            placeholder='Specialization' 
            isSearchable
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            onChange={value => onChange('job_category_id', value.id)}
            options={options.jobCategories || []}
          />
        ) : (
          <TextField
            className='iField'
            onChange={onElementChange}
            value={fields.keyword}
            placeholder='Job Title'
            id='keyword'
          />
        )}
        <Select
          className='iField iField-rs'
          classNamePrefix='iField-rs'
          placeholder='Province' 
          instanceId='province'
          isSearchable
          getOptionLabel={(e) => e.provDesc}
          value={getAddressValue('province', fields)}
          onChange={value => onChange('province', value.provCode)}
          options={getAddressOptions('province', fields)}
        />
      </div>

      <Button
        className='iBttn iBttn-primary searchCard_searchBtn'
        children='Search'
        onClick={() => {
          const url = isAdmin ? '/user/applicant/suggestion' : '/job/search'
          dispatch(GetJobData({
            url,
            data: fields,
            key: 'list'
          }))
        }}
        flat
      />
    </Card>
  )
}

export default connect(
  createSelector(
    formOptionsSelector,
    authSelector,
    (options, auth) => ({
      ...options,
      ...auth
    })
  )
)(Search)
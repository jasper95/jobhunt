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
import { provinceOptions } from 'components/Dialogs/Job'
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
          <div className='iField'>
            <label>Category</label>
            <Select
              isSearchable
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.id}
              onChange={value => onChange('job_category_id', value.id)}
              options={options.jobCategories || []}
            />
          </div>
        ) : (
          <TextField
            className='iField'
            onChange={onElementChange}
            value={fields.keyword}
            label='Job Title'
            id='keyword'
          />
        )}
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
        onClick={() => {
          dispatch(GetJobData({
            url: '/job/search',
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
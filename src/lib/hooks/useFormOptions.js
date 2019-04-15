import { GetJobCategoryOptions } from 'redux/formOptions/actions'
import { useEffect } from 'react'
import { createSelector } from 'reselect'

export default function useFormOptions({ dispatch, options, optionKeys = [] }) {
  useEffect(() => {
    optionKeys.forEach(({ key, payload = {} }) => {
      if (!options[key] || !options[key].length || options.forceFetch.includes(key)) {
        switch(key) {
          case 'jobCategories':
            dispatch(GetJobCategoryOptions(payload))
            break
          default:
        }
      }
    })
  }, [1])
}

export const formOptionsSelector = createSelector(
  state => state.formOptions,
  (options) => ({
    options
  })
)

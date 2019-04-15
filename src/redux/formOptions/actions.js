import queryString from 'query-string'

export function GetJobCategoryOptions() {
  return {
    type: 'QUERY_REQUESTED',
    payload: {
      requestConfig: {
        url: `/job_category?${queryString.stringify({ fields: ['id', 'name']})}`
      },
      reducer: 'SET_FORM_OPTIONS',
      key: 'jobCategories'
    }
  }
}
import queryString from 'query-string'

export function GetJobData(payload) {
  const {
    data,
    url,
    request = true,
    ...restPayload
  } = payload
  if (request) {
    return {
      type: 'QUERY_REQUESTED',
      payload: {
        requestConfig: {
          url: `${url}?${queryString.stringify(data)}`
        },
        reducer: 'SET_JOB_QUERY_RESULT',
        ...restPayload
      }
    }
  } else {
    return {
      type: 'SET_JOB_QUERY_RESULT',
      payload: {
        data,
        ...restPayload
      }
    }
  }
}
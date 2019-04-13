import queryString from 'query-string'

export function GetProfileData(payload) {
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
        reducer: 'SET_PROFILE_QUERY_RESULT',
        ...restPayload
      }
    }
  } else {
    return {
      type: 'SET_PROFILE_QUERY_RESULT',
      payload: {
        data,
        ...restPayload
      }
    }
  }
}
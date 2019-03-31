export function ShowError(payload) {
  return {
    type: 'ERROR',
    payload
  }
}

export function ShowSuccess(payload) {
  return {
    type: 'SUCCESS',
    payload
  }
}
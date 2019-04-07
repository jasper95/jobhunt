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

export function ShowDialog(payload) {
  return {
    type: 'SHOW_DIALOG',
    payload
  }
}

export function HideDialog(payload) {
  return {
    type: 'HIDE_DIALOG'
  }
}
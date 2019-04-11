export function Create(payload) {
  return {
    type: 'CREATE_NODE_REQUESTED',
    payload
  }
}

export function Update(payload) {
  return {
    type: 'UPDATE_NODE_REQUESTED',
    payload
  }
}


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

export function DialogProcessing(payload) {
  return {
    type: 'DIALOG_PROCESSING',
    payload
  }
}

export function HideDialog(payload) {
  return {
    type: 'HIDE_DIALOG'
  }
}
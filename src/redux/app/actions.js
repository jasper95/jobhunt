import capitalize from 'lodash/capitalize'
import { getFileLink } from 'lib/tools'

export function Create(payload) {
  const {
    data,
    node,
    successMessage = `${capitalize(node)} sucessfullly created`,
    ...restPayload
  } = payload
  return {
    type: 'MUTATION_REQUESTED',
    payload: {
      successMessage,
      requestConfig: {
        method: 'POST',
        data,
        url: `/${node}`
      },
      ...restPayload
    }
  }
}

export function Update(payload) {
  const {
    data,
    node,
    successMessage = `${capitalize(node)} sucessfullly updated`,
    ...restPayload
  } = payload
  return {
    type: 'MUTATION_REQUESTED',
    payload: {
      successMessage,
      requestConfig: {
        method: 'PUT',
        data,
        url: `/${node}`
      },
      data,
      ...restPayload
    }
  }
}

export function Upload(payload) {
  const {
    data,
    node,
    successMessage = 'File sucessfully uploaded',
    ...restPayload
  } = payload
  return {
    type: 'MUTATION_REQUESTED',
    payload: {
      successMessage,
      requestConfig: {
        method: 'POST',
        data,
        url: '/file/upload'
      },
      data,
      ...restPayload
    }
  }
}

export function Download(payload) {
  return {
    type: 'DOWNLOAD_REQUESTED',
    payload
  }
}

export function Delete(payload) {
  const {
    data,
    node,
    successMessage = `${capitalize(node)} sucessfullly deleted`,
    ...restPayload
  } = payload
  return {
    type: 'MUTATION_REQUESTED',
    payload: {
      successMessage,
      requestConfig: {
        method: 'DELETE',
        data,
        url: `/${node}`
      },
      data,
      ...restPayload
    }
  }
}

export function HideNotification() {
  return {
    type: 'HIDE_NOTIFICATION'
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

export function FormProcessing(payload) {
  return {
    type: 'FORM_PROCESSING',
    payload
  }
}

export function ClearLoading() {
  return {
    type: 'CLEAR_LOADING_STATES'
  }
}

export function HideDialog() {
  return {
    type: 'HIDE_DIALOG'
  }
}
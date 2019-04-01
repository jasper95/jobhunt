export function SetUserAuth(payload) {
  return {
    type: 'SET_USER_AUTH',
    payload
  }
}

export function Logout(payload) {
  return {
    type: 'LOGOUT',
    payload
  }
}

export function Login(payload) {
  return {
    type: 'LOGIN_REQUESTED',
    payload
  }
}

export function SignUp(payload) {
  return {
    type: 'SIGNUP_REQUESTED',
    payload
  }
}

export function Unauthorized() {
  return {
    type: 'UNAUTHORIZED'
  }
}
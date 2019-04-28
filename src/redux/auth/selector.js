import { createSelector } from 'reselect'

export default createSelector(
  state => state.auth.user,
  user => ({ user, isAdmin: user && user.type === 'ADMIN' })
)
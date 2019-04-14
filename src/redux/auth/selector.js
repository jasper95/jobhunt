import { createSelector } from 'reselect'

export default createSelector(
  state => state.auth.user,
  user => ({ user })
)
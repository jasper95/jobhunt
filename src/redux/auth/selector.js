import { createSelector } from 'reselect'
import { getFileLink } from 'lib/tools'

export default createSelector(
  state => state.auth.user,
  (user) => {
    const isAdmin = user && user.role === 'ADMIN'
    let avatarLink
    let profileLink
    if (user && isAdmin) {
      const { company } = user
      avatarLink = getFileLink({ type: 'avatar', node: 'company', id: company.id, updated: company.updated_date })
      profileLink = `/company/${company.slug}`
    } else if (user) {
      avatarLink = getFileLink({ type: 'avatar', node: 'user', id: user.id, updated: user.updated_date })
      profileLink = `/user/${user.slug}`
    }
    return {
      isAuthenticated: Boolean(user),
      isAdmin,
      user,
      avatarLink,
      profileLink
    }
  }
)
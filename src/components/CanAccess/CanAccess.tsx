import { ReactNode } from 'react'

import { useUserSession } from '../../hooks'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

type Props = {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

function CanAccess (props: Props) {
  const { children, permissions, roles } = props

  const { isAuthenticated, user } = useUserSession()
  const { hasAllPermissions, hasAllRoles } = validateUserPermissions({
    user,
    permissions,
    roles
  })

  if (!isAuthenticated || !hasAllPermissions || !hasAllRoles) {
    return null
  }

  return <>{children}</>
}

export default CanAccess

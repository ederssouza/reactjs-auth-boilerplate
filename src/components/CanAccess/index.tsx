import { ReactNode, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

type Props = {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export function CanAccess ({ children, permissions, roles }: Props) {
  const { isAuthenticated, user } = useContext(AuthContext)
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

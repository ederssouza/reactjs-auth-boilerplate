import { ReactNode } from 'react'

import { useUserSession } from '../../hooks/useUserSession'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

type Props = {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export function CanAccess ({ children, permissions, roles }: Props) {
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

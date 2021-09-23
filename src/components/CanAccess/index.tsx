import { ReactNode, useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

interface ICanAccessProps {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export function CanAccess ({ children, permissions, roles }: ICanAccessProps) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const { hasAllPermissions, hasAllRoles } = validateUserPermissions({ user, permissions, roles })

  if (!isAuthenticated || !hasAllPermissions || !hasAllRoles) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

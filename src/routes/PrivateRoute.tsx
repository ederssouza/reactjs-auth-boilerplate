import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useUserSession } from '../hooks/useUserSession'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type Props = {
  permissions?: string[]
  roles?: string[]
  redirectTo?: string
  children: ReactNode
}

export function PrivateRoute ({
  permissions,
  roles,
  redirectTo = '/login',
  children
}: Props) {
  const { isAuthenticated, user, loadingUserData } = useUserSession()
  const { hasAllPermissions } = validateUserPermissions({ user, permissions, roles })

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  if (!hasAllPermissions) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

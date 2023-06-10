import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
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
  const { isAuthenticated, user, loadingUserData } = useContext(AuthContext)
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

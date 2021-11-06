import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

interface IPrivateRoute {
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
}: IPrivateRoute) {
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

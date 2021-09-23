import { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

interface IPrivateRouteProps extends RouteProps {
  permissions?: string[]
  roles?: string[]
}

export const PrivateRoute = ({ permissions, roles, ...rest }: IPrivateRouteProps) => {
  const { isAuthenticated, user, loadingUserData } = useContext(AuthContext)
  const { hasAllPermissions } = validateUserPermissions({ user, permissions, roles })

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />
  }

  if (!hasAllPermissions) {
    return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
  }

  return <Route {...rest} />
}

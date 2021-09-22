import { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

interface IPrivateRouteProps extends RouteProps {
  hasAccess?: boolean
}

export const PrivateRoute = ({ hasAccess = true, ...rest }: IPrivateRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated && hasAccess
    ? (<Route {...rest} />)
    : (<Redirect to={{ pathname: '/login', state: { from: rest.location } }} />)
}

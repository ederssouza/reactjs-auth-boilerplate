import { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export const PrivateRoute = (props: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated
    ? (<Route {...props} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
}

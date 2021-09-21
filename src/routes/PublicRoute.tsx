import { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export const PublicRoute = (props: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated
    ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    : (<Route {...props} />)
}

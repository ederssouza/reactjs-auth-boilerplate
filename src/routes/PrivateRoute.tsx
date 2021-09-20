import { Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from '../hooks/useAuth'

export const PrivateRoute = (props: RouteProps) => {
  const condition = isAuthenticated()

  return condition
    ? (<Route {...props} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
}

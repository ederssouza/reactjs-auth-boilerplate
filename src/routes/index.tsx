import { Switch } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Metrics } from '../pages/Metrics'
import { Register } from '../pages/Register'
import { Users } from '../pages/Users'
import { HybridRoute } from './HybridRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const Routes = () => (
  <Switch>
    <PrivateRoute
      exact
      path="/"
      component={Home}
    />

    <PublicRoute
      path="/login"
      component={Login}
    />

    <HybridRoute
      path="/register"
      component={Register}
    />

    <PrivateRoute
      exact
      path="/metrics"
      component={Metrics}
      permissions={['metrics.list']}
    />

    <PrivateRoute
      path="/users"
      component={Users}
      permissions={['users.list', 'users.create']}
    />
  </Switch>
)

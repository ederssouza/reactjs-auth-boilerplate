import { Switch } from 'react-router-dom'

import { Blog } from '../pages/Blog'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Metrics } from '../pages/Metrics'
import { Profile } from '../pages/Profile'
import { Register } from '../pages/Register'
import { Users } from '../pages/Users'
import { HybridRoute } from './HybridRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const Routes = () => (
  <Switch>
    <PublicRoute
      path="/login"
      component={Login}
    />

    <HybridRoute
      path="/blog"
      component={Blog}
    />

    <HybridRoute
      path="/register"
      component={Register}
    />

    <PrivateRoute
      exact
      path="/"
      component={Home}
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

    <HybridRoute
      path="/profile"
      component={Profile}
    />
  </Switch>
)

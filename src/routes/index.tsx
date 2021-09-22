import { Switch } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Users } from '../pages/Users'
import { HybridRoute } from './HybridRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const Routes = () => (
  <Switch>
    <PublicRoute path="/login" component={Login} />
    <HybridRoute path="/register" component={Register} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/users" component={Users} hasAccess={true} />
  </Switch>
)

import { Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { HybridRoute } from './HybridRoute'

// page components
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Users } from '../pages/Users'

export const Routes = () => (
  <Switch>
    <PublicRoute path="/login" component={Login} />
    <HybridRoute path="/register" component={Register} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/users" component={Users} />
  </Switch>
)

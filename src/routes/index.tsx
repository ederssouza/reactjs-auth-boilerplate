import { Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { HybridRoute } from './HybridRoute'

export const Routes = () => (
  <Switch>
    <PublicRoute path="/login" component={() => <h1>Login</h1>} />
    <HybridRoute path="/register" component={() => <h1>Register</h1>} />
    <PrivateRoute exact path="/" component={() => <h1>Home</h1>} />
    <PrivateRoute path="/users" component={() => <h1>Users</h1>} />
  </Switch>
)

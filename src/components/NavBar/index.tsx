import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { CanAccess } from '../CanAccess'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <div>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/">Home</Link></li>

        <CanAccess permissions={['users.list']}>
          <li><Link to="/users">Users</Link></li>
        </CanAccess>

        <CanAccess permissions={['metrics.list']}>
          <li><Link to="/metrics">Metrics</Link></li>
        </CanAccess>
      </ul>

      {isAuthenticated && (
        <>
          <span style={{ marginRight: 4 }}>{user?.email}</span>
          <button data-testid="logout-button" onClick={signOut}>Logout</button>
        </>
      )}
    </div>
  )
}

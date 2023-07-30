import { useRoutePaths, useSession } from '@/hooks'
import { Link } from 'react-router-dom'
import { CanAccess } from '../CanAccess'

function NavBar() {
  const { isAuthenticated, user, signOut } = useSession()
  const { LOGIN_PATH, METRICS_PATH, REGISTER_PATH, ROOT_PATH, USERS_PATH } =
    useRoutePaths()

  return (
    <div>
      <ul>
        <li>
          <Link to={LOGIN_PATH}>Login</Link>
        </li>
        <li>
          <Link to={REGISTER_PATH}>Register</Link>
        </li>
        <li>
          <Link to={ROOT_PATH}>Home</Link>
        </li>

        <CanAccess permissions={['users.list']}>
          <li>
            <Link to={USERS_PATH}>Users</Link>
          </li>
        </CanAccess>

        <CanAccess permissions={['metrics.list']}>
          <li>
            <Link to={METRICS_PATH}>Metrics</Link>
          </li>
        </CanAccess>
      </ul>

      {isAuthenticated && (
        <>
          <span style={{ marginRight: 4 }}>{user?.email}</span>
          <button onClick={signOut}>Logout</button>
        </>
      )}
    </div>
  )
}

export default NavBar

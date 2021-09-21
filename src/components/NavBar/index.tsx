import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <div>
      <Link to="/login">Login</Link>&nbsp;
      <Link to="/register">Register</Link>&nbsp;
      <Link to="/">Home</Link>&nbsp;
      <Link to="/users">Users</Link>

      {isAuthenticated && (
        <>
          <span>{user?.email}</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  )
}

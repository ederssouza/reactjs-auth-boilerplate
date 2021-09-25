import { useContext } from 'react'

import { AuthContext } from '../../context/AuthContext'

export function Profile () {
  const { isAuthenticated, loadingUserData, user, signIn, signOut } = useContext(AuthContext)

  return (
    <div>
      <h1>Profile</h1>

      <ul>
        <li>isAuthenticated: {isAuthenticated}</li>
        <li>loadingUserData: {loadingUserData}</li>
        <li>user: {user?.email}</li>
      </ul>

      <button
        data-testid="signin-button"
        onClick={() => signIn({ email: 'email@site.com', password: 'password' })}
      >
        signIn
      </button>

      <button
        data-testid="signout-button"
        onClick={() => signOut()}
      >
        signOut
      </button>
    </div>
  )
}

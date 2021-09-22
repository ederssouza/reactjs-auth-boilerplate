import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { api, setHeaderAuthorization } from '../services/api'
import { COOKIE_EXPIRATION_TIME, REFRESH_TOKEN_COOKIE, TOKEN_COOKIE } from '../utils/constants'

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const history = useHistory()
  const { pathname } = useLocation()

  const cookies = parseCookies()
  const token = cookies[TOKEN_COOKIE]
  const isAuthenticated = Boolean(token)
  const userData = user as User

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(null, TOKEN_COOKIE, token, {
        maxAge: COOKIE_EXPIRATION_TIME,
        path: '/'
      })

      setCookie(null, REFRESH_TOKEN_COOKIE, refreshToken, {
        maxAge: COOKIE_EXPIRATION_TIME,
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      setHeaderAuthorization(api.defaults, token)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  function signOut (pathname = '/login') {
    destroyCookie(null, TOKEN_COOKIE)
    destroyCookie(null, REFRESH_TOKEN_COOKIE)
    setUser(null)
    history.push(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies[TOKEN_COOKIE]

    setHeaderAuthorization(api.defaults, token)

    if (token) {
      api.get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data
          setUser({ email, permissions, roles })
        })
        .catch(() => signOut())
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { api } from '../services/api'
import { COOKIE_EXPIRATION_TIME } from '../utils/constants'

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

  const { 'reactauth.token': token } = parseCookies()
  const isAuthenticated = Boolean(token)
  const userData = user as User

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(null, 'reactauth.token', token, {
        maxAge: COOKIE_EXPIRATION_TIME,
        path: '/'
      })

      setCookie(null, 'reactauth.refreshToken', refreshToken, {
        maxAge: COOKIE_EXPIRATION_TIME,
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers.Authorization = `Bearer ${token}`
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  function signOut () {
    destroyCookie(null, 'reactauth.token')
    destroyCookie(null, 'reactauth.refreshToken')
    setUser(null)
    history.push('/login')
  }

  useEffect(() => {
    if (!token) signOut()
  }, [pathname, token])

  useEffect(() => {
    const { 'reactauth.token': token } = parseCookies()

    api.defaults.headers.Authorization = `Bearer ${token}`

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

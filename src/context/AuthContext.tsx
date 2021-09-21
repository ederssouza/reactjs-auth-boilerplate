import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../services/api'

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
  const isAuthenticated = Boolean(user)
  const userData = user as User

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'reactauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/' // qualquer rota da aplicação terá acesso ao cookie
      })

      setCookie(undefined, 'reactauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/' // qualquer rota da aplicação terá acesso ao cookie
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

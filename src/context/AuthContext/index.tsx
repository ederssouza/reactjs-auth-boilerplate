import { AxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { api } from '../../services/api'
import { setAuthorizationHeader } from '../../services/interceptors'
import { createTokenCookies, getToken, removeTokenCookies } from '../../utils/tokenCookies'

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
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  user: User
  isAuthenticated: boolean
  loadingUserData: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const isAuthenticated = Boolean(token)
  const userData = user as User

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      createTokenCookies(token, refreshToken)
      setUser({ email, permissions, roles })
      setAuthorizationHeader(api.defaults, token)
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  function signOut (pathname = '/login') {
    removeTokenCookies()
    setUser(null)
    setLoadingUserData(false)
    navigate(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData () {
      setLoadingUserData(true)

      try {
        const response = await api.get('/me')

        if (response?.data) {
          const { email, permissions, roles } = response.data
          setUser({ email, permissions, roles })
        }
      } catch (error) {
        signOut()
      }

      setLoadingUserData(false)
    }

    if (token) {
      setAuthorizationHeader(api.defaults, token)
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: userData,
      loadingUserData,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

import { AxiosError } from 'axios'
import { createContext } from 'react'

export type User = {
  email: string
  permissions: string[]
  roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextData = {
  user?: User
  isAuthenticated: boolean
  loadingUserData: boolean
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext

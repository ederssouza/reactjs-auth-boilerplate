import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

interface IPublicRoute {
  children: ReactNode
}

export function PublicRoute ({ children }: IPublicRoute) {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>
}

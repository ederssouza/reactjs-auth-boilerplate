import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

type Props = {
  children: ReactNode
}

export function PublicRoute ({ children }: Props) {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>
}

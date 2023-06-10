import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useUserSession } from '../hooks/useUserSession'

type Props = {
  children: ReactNode
}

export function PublicRoute ({ children }: Props) {
  const { isAuthenticated } = useUserSession()

  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>
}

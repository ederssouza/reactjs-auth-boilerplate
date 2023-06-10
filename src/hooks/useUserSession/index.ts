import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export function useUserSession () {
  const data = useContext(AuthContext)

  return data
}

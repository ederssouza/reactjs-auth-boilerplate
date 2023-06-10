import { useContext } from 'react'

import { AuthContext } from '../contexts'

export function useUserSession () {
  const data = useContext(AuthContext)

  return data
}

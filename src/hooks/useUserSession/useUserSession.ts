import { useContext } from 'react'

import { AuthContext } from '../../contexts'

function useUserSession () {
  const data = useContext(AuthContext)

  return data
}

export default useUserSession

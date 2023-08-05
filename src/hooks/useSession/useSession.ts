import { useContext } from 'react'
import { AuthContext } from '@/contexts'

function useSession() {
  return useContext(AuthContext)
}

export default useSession

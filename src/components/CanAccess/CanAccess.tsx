import { ReactNode } from 'react'
import { useSession } from '@/hooks'
import { validateUserPermissions } from '@/utils'

type Props = {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

function CanAccess(props: Props) {
  const { children, permissions, roles } = props

  const { isAuthenticated, user } = useSession()
  const { hasAllPermissions, hasAllRoles } = validateUserPermissions({
    user,
    permissions,
    roles
  })

  if (!isAuthenticated || !hasAllPermissions || !hasAllRoles) {
    return null
  }

  return <>{children}</>
}

export default CanAccess

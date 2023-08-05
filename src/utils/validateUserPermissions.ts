type User = {
  permissions: string[]
  roles: string[]
}

type Params = {
  user?: User
  permissions?: string[]
  roles?: string[]
}

export function validateUserPermissions(params: Params) {
  const { user, permissions, roles } = params

  let hasAllPermissions = true
  let hasAllRoles = true

  if (permissions?.length) {
    const userPermissions = user?.permissions || []

    hasAllPermissions = permissions.every((permission) => {
      return userPermissions.includes(permission)
    })
  }

  if (roles?.length) {
    const userRoles = user?.roles || []

    hasAllRoles = roles.every((role) => {
      return userRoles.includes(role)
    })
  }

  return { hasAllPermissions, hasAllRoles }
}

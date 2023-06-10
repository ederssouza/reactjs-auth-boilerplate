import { render, screen } from '@testing-library/react'

import { CanAccess } from '.'
import { useUserSession } from '../../hooks/useUserSession'
import { validateUserPermissions } from '../../utils/validateUserPermissions'

jest.mock('../../hooks/useUserSession', () => ({
  useUserSession: jest.fn()
}))

jest.mock('../../utils/validateUserPermissions', () => ({
  validateUserPermissions: jest.fn()
}))

describe('CanAccess component', () => {
  beforeEach(() => {
    (useUserSession as jest.Mock).mockReturnValue({
      isAuthenticated: true
    })
  })

  describe('when the user does not have permission', () => {
    it('should not render child component', () => {
      (validateUserPermissions as jest.Mock).mockReturnValue({
        hasAllPermissions: false,
        hasAllRoles: false
      })

      render(<CanAccess>Sample component</CanAccess>)

      expect(screen.queryByText('Sample component')).not.toBeInTheDocument()
    })
  })

  describe('when the user has permission', () => {
    it('should render child component', () => {
      (validateUserPermissions as jest.Mock).mockReturnValue({
        hasAllPermissions: true,
        hasAllRoles: true
      })

      render(<CanAccess>Sample component</CanAccess>)

      expect(screen.getByText('Sample component')).toBeInTheDocument()
    })
  })
})

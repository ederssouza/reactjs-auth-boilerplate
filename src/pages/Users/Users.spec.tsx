import { render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { Users } from '.'
import { api } from '../../services/api'

jest.mock('../../services/api')

describe('Users page component', () => {
  it('should render list of users', async () => {
    const getUsersMocked = mocked(api.get)
    const responseMock = {
      data: {
        users: [
          { id: 1, name: 'User 1', email: 'user1@site.com' },
          { id: 2, name: 'User 2', email: 'user2@site.com' }
        ]
      }
    }

    getUsersMocked.mockReturnValueOnce({ ...responseMock } as any)

    render(<Users />)

    expect(getUsersMocked).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.getByText(/User 1/)).toBeInTheDocument()
      expect(screen.getByText(/User 2/)).toBeInTheDocument()
    }, { timeout: 1000 })

    expect(getUsersMocked).toHaveReturnedWith({ ...responseMock })
  })

  it('should render empty list message when request not return payload', async () => {
    const getUsersMocked = mocked(api.get)

    getUsersMocked.mockReturnValueOnce({ data: {} } as any)

    render(<Users />)

    expect(getUsersMocked).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.getByText(/empty user list/)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('should ', async () => {
    const getUsersMocked = mocked(api.get)

    getUsersMocked.mockRejectedValueOnce({})

    render(<Users />)

    expect(getUsersMocked).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.getByText(/empty user list/)).toBeInTheDocument()
    }, { timeout: 1000 })
  })
})

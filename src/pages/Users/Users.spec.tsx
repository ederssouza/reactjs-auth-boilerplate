import { render, screen, waitFor } from '@testing-library/react'
import { api } from '@/services/api'
import Users from './Users'

jest.mock('@/services/api')

describe('Users page component', () => {
  describe('when the request returns valid data', () => {
    it('should render a list of users', async () => {
      const responseMock = {
        data: {
          users: [
            { id: 1, name: 'User 1', email: 'user1@site.com' },
            { id: 2, name: 'User 2', email: 'user2@site.com' }
          ]
        }
      }

      ;(api.get as jest.Mock).mockReturnValueOnce(responseMock)

      render(<Users />)

      await waitFor(
        () => {
          expect(screen.getByText(/User 1/)).toBeInTheDocument()
          expect(screen.getByText(/User 2/)).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when the request does not return the payload', () => {
    it('should render empty list message', async () => {
      ;(api.get as jest.Mock).mockReturnValueOnce({ data: {} })

      render(<Users />)

      await waitFor(
        () => {
          expect(screen.getByText(/empty user list/)).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when the request does not return the data attribute', () => {
    it('should render empty list message', async () => {
      ;(api.get as jest.Mock).mockRejectedValueOnce({})

      render(<Users />)

      await waitFor(
        () => {
          expect(screen.getByText(/empty user list/)).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })
})

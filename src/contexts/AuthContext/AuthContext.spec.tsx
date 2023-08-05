import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useSession } from '@/hooks'
import { AuthProvider } from '@/providers'
import { api } from '@/services'
import { paths } from '@/router'

const mockNavigate = jest.fn()

jest.mock('@/services/api')
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: '/'
  })
}))

function SampleComponent() {
  const { signIn, signOut } = useSession()

  return (
    <div>
      <button
        onClick={() =>
          signIn({
            email: 'email@site.com',
            password: 'password'
          })
        }
      >
        Sign in
      </button>

      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

function customRender() {
  render(
    <AuthProvider>
      <SampleComponent />
    </AuthProvider>
  )
}

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when invoked and return valid response', () => {
    it('should dispatch signIn function', async () => {
      const responseMock = {
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          refreshToken: '84ee647c-ac74-4e34-bb84-1bd6c96b3977',
          permissions: ['users.list', 'users.create', 'metrics.list'],
          roles: ['administrator']
        }
      }

      ;(api.post as jest.Mock).mockReturnValueOnce(responseMock)

      customRender()

      const signInButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.click(signInButton)

      await waitFor(
        () => {
          expect(api.post).toHaveBeenCalledTimes(1)
          expect(api.post).toHaveReturnedWith(responseMock)
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when invoked and return invalid response', () => {
    it('should dispatch signIn function', async () => {
      ;(api.post as jest.Mock).mockRejectedValueOnce({})

      customRender()

      const signInButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.click(signInButton)

      await waitFor(
        () => {
          expect(api.post).toHaveBeenCalledTimes(1)
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when the request to `/me` endpoint returns valid data', () => {
    it('should return valid paylod on make `/me`', async () => {
      const responseMock = {
        data: {
          email: 'admin@site.com',
          permissions: ['users.list', 'users.create', 'metrics.list'],
          roles: ['administrator']
        }
      }

      ;(api.get as jest.Mock).mockReturnValueOnce(responseMock)

      customRender()

      await waitFor(
        () => {
          expect(api.get).toHaveBeenCalledTimes(1)
          expect(api.get).toHaveReturnedWith(responseMock)
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when the request to `/me` endpoint returns invalid data', () => {
    it('should return an error', async () => {
      ;(api.get as jest.Mock).mockRejectedValueOnce({})

      customRender()

      await waitFor(
        () => {
          expect(api.get).toHaveBeenCalledTimes(1)
        },
        { timeout: 1000 }
      )
    })
  })

  describe('when the user clicks on the logout button', () => {
    it('should dispatch signOut function', async () => {
      customRender()

      const signOutButton = screen.getByRole('button', { name: /sign out/i })

      fireEvent.click(signOutButton)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toBeCalledWith(paths.LOGIN_PATH)
      })
    })
  })
})

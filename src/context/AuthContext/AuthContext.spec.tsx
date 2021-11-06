import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useContext } from 'react'
import { mocked } from 'ts-jest/utils'

import { AuthProvider, AuthContext } from '.'
import { api } from '../../services/api'

jest.mock('../../services/api')

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/'
  })
}))

function SampleComponent () {
  const { signIn, signOut } = useContext(AuthContext)

  return (
    <div>
      <button
        data-testid="signin-button"
        onClick={() => signIn({
          email: 'email@site.com',
          password: 'password'
        })}
      >
        signIn
      </button>

      <button
        data-testid="signout-button"
        onClick={() => signOut()}
      >
        signOut
      </button>
    </div>
  )
}

describe('AuthProvider', () => {
  it('should dispatch signIn function when invoked and return valid response', async () => {
    const signInMocked = mocked(api.post)
    const responseMock = {
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshToken: '84ee647c-ac74-4e34-bb84-1bd6c96b3977',
        permissions: ['users.list', 'users.create', 'metrics.list'],
        roles: ['administrator']
      }
    }

    signInMocked.mockReturnValueOnce({ ...responseMock } as any)

    render(
      <AuthProvider>
        <SampleComponent />
      </AuthProvider>
    )

    const $signInButton = screen.getByTestId('signin-button')
    fireEvent.click($signInButton)

    await waitFor(() => {
      expect(signInMocked).toHaveBeenCalledTimes(1)
      expect(signInMocked).toHaveReturnedWith({ ...responseMock })
    }, { timeout: 1000 })
  })

  it('should dispatch signIn function when invoked and return invalid response', async () => {
    const signInMocked = mocked(api.post)

    signInMocked.mockRejectedValueOnce({})

    render(
      <AuthProvider>
        <SampleComponent />
      </AuthProvider>
    )

    const $signInButton = screen.getByTestId('signin-button')
    fireEvent.click($signInButton)

    await waitFor(() => {
      expect(signInMocked).toHaveBeenCalledTimes(1)
    }, { timeout: 1000 })
  })

  it('should return valid paylod on make `/me`', async () => {
    const signInMocked = mocked(api.get)
    const responseMock = {
      data: {
        email: 'admin@site.com',
        permissions: ['users.list', 'users.create', 'metrics.list'],
        roles: ['administrator']
      }
    }

    signInMocked.mockReturnValueOnce({ ...responseMock } as any)

    render(
      <AuthProvider>
        <SampleComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(signInMocked).toHaveBeenCalledTimes(1)
      expect(signInMocked).toHaveReturnedWith({ ...responseMock })
    }, { timeout: 1000 })
  })

  it('should return erro when `/me` request is invalid', async () => {
    const signInMocked = mocked(api.get)

    signInMocked.mockRejectedValueOnce({})

    render(
      <AuthProvider>
        <SampleComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(signInMocked).toHaveBeenCalledTimes(1)
    }, { timeout: 1000 })
  })

  it('should call signOut function on click button', () => {
    // const signOut = jest.fn()
    render(
      <AuthProvider>
        <SampleComponent />
      </AuthProvider>
    )

    const $signOutButton = screen.getByTestId('signout-button')
    fireEvent.click($signOutButton)
    // expect(signOut).toBeCalledTimes(0)
  })
})

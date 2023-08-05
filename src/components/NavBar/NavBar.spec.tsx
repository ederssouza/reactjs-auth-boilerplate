import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@/contexts'
import { paths } from '@/router'
import NavBar from './NavBar'

const providerUserUnloggedMock = {
  signIn: jest.fn(),
  signOut: jest.fn(),
  user: undefined,
  isAuthenticated: false,
  loadingUserData: false
}

const providerUserLoggedMock = {
  signIn: jest.fn(),
  signOut: jest.fn(),
  user: {
    email: 'email@site.com',
    permissions: ['users.list', 'metrics.list'],
    roles: []
  },
  isAuthenticated: true,
  loadingUserData: false
}

type WrapperProps = {
  children: ReactNode
}

function wrapper(props: WrapperProps) {
  const { children } = props

  return <MemoryRouter>{children}</MemoryRouter>
}

describe('NavBar component', () => {
  it('should render with success', () => {
    render(
      <AuthContext.Provider value={providerUserUnloggedMock}>
        <NavBar />
      </AuthContext.Provider>,
      { wrapper }
    )

    expect(screen.getByText(/Login/)).toHaveAttribute('href', paths.LOGIN_PATH)
  })

  describe('when the user is authenticated', () => {
    it('should show user email', () => {
      render(
        <AuthContext.Provider value={providerUserLoggedMock}>
          <NavBar />
        </AuthContext.Provider>,
        { wrapper }
      )

      expect(screen.getByText(/email@site\.com/)).toBeInTheDocument()
    })
  })

  describe('when the user clicks on the logout button', () => {
    it('should logout user', () => {
      render(
        <AuthContext.Provider value={providerUserLoggedMock}>
          <NavBar />
        </AuthContext.Provider>,
        { wrapper }
      )

      const logoutButton = screen.getByRole('button', { name: /logout/i })

      fireEvent.click(logoutButton)

      expect(providerUserLoggedMock.signOut).toBeCalledTimes(1)
    })
  })
})

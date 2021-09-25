import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NavBar } from '.'
import { AuthContext } from '../../context/AuthContext'

const providerUserUnloggedMock = {
  signIn: jest.fn(),
  signOut: jest.fn(),
  user: null,
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

describe('NavBar component', () => {
  it('should render with success', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={providerUserUnloggedMock as any}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(/Login/)).toBeInTheDocument()
    expect(screen.getByText(/Login/)).toHaveAttribute('href', '/login')
  })

  it('should show user email when is authenticated', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={providerUserLoggedMock as any}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByText(/email@site\.com/)).toBeInTheDocument()
  })

  it('should logout user on click logout button', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={providerUserLoggedMock as any}>
          <NavBar />
        </AuthContext.Provider>
      </BrowserRouter>
    )

    const $logoutButton = screen.getByTestId('logout-button')

    fireEvent.click($logoutButton)

    expect(providerUserLoggedMock.signOut).toBeCalledTimes(1)
  })
})

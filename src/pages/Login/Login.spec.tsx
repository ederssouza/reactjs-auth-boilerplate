import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Login } from '.'
import { AuthContext } from '../../context/AuthContext'

const providerUserUnloggedMock = {
  signIn: jest.fn(),
  signOut: jest.fn(),
  user: null,
  isAuthenticated: false,
  loadingUserData: false
}

describe('Login page component', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={providerUserUnloggedMock as any}>
        <Login />
      </AuthContext.Provider>
    )
  })

  it('should have a value on input on the fields', () => {
    const $inputEmail = screen.getByTestId('login-input-email') as HTMLInputElement
    const $inputPassword = screen.getByTestId('login-input-password') as HTMLInputElement

    fireEvent.change($inputEmail, { target: { value: 'email@site.com' } })
    fireEvent.change($inputPassword, { target: { value: 'senha@123' } })

    expect($inputEmail.value).toEqual('email@site.com')
    expect($inputPassword.value).toEqual('senha@123')
  })

  it('should disabled button when submit form', async () => {
    const $form = screen.getByTestId('login-form') as HTMLFormElement
    const $button = screen.getByTestId('login-submit-button') as HTMLButtonElement

    expect($button).not.toHaveAttribute('disabled')
    expect($button).toHaveTextContent(/Submit/)

    fireEvent.submit($form)

    await waitFor(() => {
      expect($button).toHaveAttribute('disabled')
      expect($button).toHaveTextContent(/Loading/)
    }, { timeout: 1000 })
  })
})

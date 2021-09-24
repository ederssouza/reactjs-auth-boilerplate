import { fireEvent, render, screen } from '@testing-library/react'

import { Login } from '.'

describe('Login page component', () => {
  it('should render with success', () => {
    render(<Login />)
    const linkElement = screen.getByText(/Login/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('should have a value on input value in the fields', () => {
    render(<Login />)

    const $inputEmail = screen.getByTestId('login-input-email') as HTMLInputElement
    const $inputPassword = screen.getByTestId('login-input-password') as HTMLInputElement

    fireEvent.change($inputEmail, { target: { value: 'email@site.com' } })
    fireEvent.change($inputPassword, { target: { value: 'senha@123' } })

    expect($inputEmail.value).toEqual('email@site.com')
    expect($inputPassword.value).toEqual('senha@123')
  })

  it('should disabled button when submit form', () => {
    render(<Login />)

    const $form = screen.getByTestId('login-form') as HTMLFormElement
    const $button = screen.getByTestId('login-submit-button') as HTMLButtonElement

    console.log($button.innerHTML)

    fireEvent.submit($form)

    console.log($button.innerHTML)
  })

  it.todo('handleSubmit')
})

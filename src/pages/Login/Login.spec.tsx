import { render, screen } from '@testing-library/react'

import { Login } from '.'

describe('Login page component', () => {
  it('should render with success', () => {
    render(<Login />)
    const linkElement = screen.getByText(/Login/i)
    expect(linkElement).toBeInTheDocument()
  })
})

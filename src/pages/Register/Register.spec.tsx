import { render, screen } from '@testing-library/react'
import Register from './Register'

describe('Register page component', () => {
  it('should render with success', () => {
    render(<Register />)

    expect(
      screen.getByRole('heading', {
        name: 'Register',
        level: 1
      })
    ).toBeInTheDocument()
  })
})

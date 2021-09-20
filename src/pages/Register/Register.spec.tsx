import { render, screen } from '@testing-library/react'

import { Register } from '.'

describe('Register page component', () => {
  it('should render with success', () => {
    render(<Register />)
    const linkElement = screen.getByText(/Register/i)
    expect(linkElement).toBeInTheDocument()
  })
})

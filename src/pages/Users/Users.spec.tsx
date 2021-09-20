import { render, screen } from '@testing-library/react'

import { Users } from '.'

describe('Users page component', () => {
  it('should render with success', () => {
    render(<Users />)
    const linkElement = screen.getByText(/Users/i)
    expect(linkElement).toBeInTheDocument()
  })
})

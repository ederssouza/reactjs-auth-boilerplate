import { render, screen } from '@testing-library/react'

import { Home } from '.'

describe('Home page component', () => {
  it('should render with success', () => {
    render(<Home />)
    const linkElement = screen.getByText(/Home/i)
    expect(linkElement).toBeInTheDocument()
  })
})

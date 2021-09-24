import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { NavBar } from '.'

const NavbarContainer = () => (
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
)

describe('NavBar component', () => {
  it('should render with success', () => {
    render(<NavbarContainer />)

    expect(screen.getByText(/Login/)).toBeInTheDocument()
    expect(screen.getByText(/Login/)).toHaveAttribute('href', '/login')

    expect(screen.getByText(/Blog/)).toBeInTheDocument()
    expect(screen.getByText(/Blog/)).toHaveAttribute('href', '/blog')
  })

  it.todo('should not show user email when not is authenticated')

  it.todo('should show user email when not is authenticated')

  it.todo('should logout user on click logout button')
})

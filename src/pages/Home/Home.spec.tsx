import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home page component', () => {
  it('should render with success', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', {
        name: 'Home',
        level: 1
      })
    ).toBeInTheDocument()
  })
})

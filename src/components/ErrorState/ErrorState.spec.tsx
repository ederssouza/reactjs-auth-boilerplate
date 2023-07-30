import { render, screen } from '@testing-library/react'
import ErrorState from './ErrorState'

describe('ErrorState | component | unit test', () => {
  it('should render with success', () => {
    render(<ErrorState />)

    expect(
      screen.getByText('An internal error occurred on the server')
    ).toBeInTheDocument()
  })

  describe('when text is passed', () => {
    it('should render with success', () => {
      render(<ErrorState text="Custom error message" />)

      expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })
  })
})

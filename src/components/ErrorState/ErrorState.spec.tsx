import { render, screen } from '@testing-library/react'
import ErrorState from './ErrorState'

describe('ErrorState | component | unit test', () => {
  it('should render with success', () => {
    render(<ErrorState>ErrorState</ErrorState>)

    expect(screen.getByText('ErrorState')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import Metrics from './Metrics'

describe('Metrics page component', () => {
  it('should render with success', () => {
    render(<Metrics />)

    expect(
      screen.getByRole('heading', {
        name: 'Metrics',
        level: 1
      })
    ).toBeInTheDocument()
  })
})

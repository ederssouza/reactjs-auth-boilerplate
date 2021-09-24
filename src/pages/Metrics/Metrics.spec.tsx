import { render, screen } from '@testing-library/react'

import { Metrics } from '.'

describe('Metrics page component', () => {
  it('should render with success', () => {
    render(<Metrics />)
    const linkElement = screen.getByText(/Metrics/i)
    expect(linkElement).toBeInTheDocument()
  })
})

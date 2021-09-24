import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Blog } from '.'
import { ThemeContext } from '../../context/ThemeContext'

describe('Blog page component', () => {
  it('should render with success', () => {
    render(<Blog />)
    const linkElement = screen.getByText(/Blog/i)
    expect(linkElement).toBeInTheDocument()
  })
})

describe('<Blog />', () => {
  it('when theme is dark', () => {
    const theme = {
      theme: 'dark',
      onThemeChange: jest.fn()
    }

    render(
      <ThemeContext.Provider value={theme}>
        <Blog />
      </ThemeContext.Provider>
    )

    fireEvent.click(screen.getByTestId('btn'))

    expect(theme.onThemeChange).toHaveBeenCalledWith('light')
    expect(theme.onThemeChange).toHaveBeenCalledTimes(1)
  })

  it('when theme is light', () => {
    const theme = {
      theme: 'light',
      onThemeChange: jest.fn()
    }

    render(
      <ThemeContext.Provider value={theme}>
        <Blog />
      </ThemeContext.Provider>
    )

    fireEvent.click(screen.getByTestId('btn'))

    expect(theme.onThemeChange).toHaveBeenCalledWith('dark')
    expect(theme.onThemeChange).toHaveBeenCalledTimes(1)
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from '.'
import { Blog } from '../../pages/Blog'

describe('ThemeContext', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Blog />
      </ThemeProvider>
    )
  })

  describe('when page is initialized', () => {
    it('then shows the light theme by default', () => {
      // "Use Dark Theme" text is only shown when the light theme is active
      expect(screen.getByText(/Use Dark Theme/i)).toBeTruthy()
    })
  })

  describe('when the toggle theme button is clicked', () => {
    beforeEach(() => {
      userEvent.click(screen.getByText(/Use Dark Theme/i))
    })

    it('then uses the dark theme', () => {
      // "Use Light Theme" text is only shown when the dark theme is active
      expect(screen.getByText(/Use Light Theme/i)).toBeTruthy()
    })
  })
})

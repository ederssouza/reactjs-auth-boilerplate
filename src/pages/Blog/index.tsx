import { useContext } from 'react'

import { ThemeContext } from '../../context/ThemeContext'

export function Blog () {
  const { theme, onThemeChange } = useContext(ThemeContext)

  return (
    <div>
      <h1>Blog</h1>
      <h2>theme: {theme}</h2>

      <button
        data-testid="btn"
        onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? 'Use Light Theme' : 'Use Dark Theme'}
      </button>
    </div>
  )
}

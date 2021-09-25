import { useState, createContext, ReactNode } from 'react'

interface IPageProps {
  children: ReactNode
}

interface ThemeContextData {
  theme: string
  onThemeChange: (newTheme: string) => void
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider ({ children }: IPageProps) {
  const [theme, setTheme] = useState('light')

  function onThemeChange (newTheme: string) {
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }} >
      {children}
    </ThemeContext.Provider>
  )
}

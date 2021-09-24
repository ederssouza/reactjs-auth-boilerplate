import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { Routes } from './routes'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <NavBar />

      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App

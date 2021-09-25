import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import { Routes } from './routes'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
      <Routes />
    </AuthProvider>
  </BrowserRouter>
)

export default App

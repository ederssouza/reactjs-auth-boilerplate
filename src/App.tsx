import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components'
import { AuthProvider } from './providers'
import { Router } from './router'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

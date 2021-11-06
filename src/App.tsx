import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import { RouteList } from './routes'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
      <RouteList />
    </AuthProvider>
  </BrowserRouter>
)

export default App

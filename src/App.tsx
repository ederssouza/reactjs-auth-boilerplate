import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components'
import { AuthProvider } from './providers'
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

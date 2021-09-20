import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { Routes } from './routes'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes />
  </BrowserRouter>
)

export default App

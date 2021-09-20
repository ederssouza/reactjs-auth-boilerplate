import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { NavBar } from './components/NavBar'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes />
  </BrowserRouter>
)

export default App

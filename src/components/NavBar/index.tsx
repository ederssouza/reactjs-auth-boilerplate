import { Link } from 'react-router-dom'

export function NavBar () {
  return (
    <div>
      <Link to="/login">Login</Link>&nbsp;
      <Link to="/register">Register</Link>&nbsp;
      <Link to="/">Home</Link>&nbsp;
      <Link to="/users">Users</Link>
    </div>
  )
}

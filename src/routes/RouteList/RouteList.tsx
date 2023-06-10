import { Routes, Route } from 'react-router-dom'

import { Home, Login, Metrics, Register, Users } from '../../pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'

function RouteList () {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute redirectTo="/login">
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route
        path="/metrics"
        element={
          <PrivateRoute permissions={['metrics.list']} redirectTo="/login">
            <Metrics />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute permissions={['users.list', 'users.create']}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="/users/:id"
        element={
          <PrivateRoute permissions={['users.list', 'users.create']}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default RouteList

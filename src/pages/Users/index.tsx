import { useEffect, useState } from 'react'

import { api } from '../../services/api'

interface User {
  id: number
  name: string
}

export function Users () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data.users))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} <strong>Name:</strong> {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

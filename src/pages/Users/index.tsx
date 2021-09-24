import { useEffect, useState } from 'react'

import { api } from '../../services/api'

interface User {
  id: number
  name: string
}

export function Users () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadUsers () {
      try {
        const response = await api.get('/users')
        const users = response?.data?.users || []
        setUsers(users)
      } catch (error) {
        console.log('ERROR:', error)
      }
    }

    loadUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.length > 0
          ? users.map(user => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id} <strong>Name:</strong> {user.name}
            </li>
          ))
          : (<div>empty user list</div>)}
      </ul>
    </div>
  )
}

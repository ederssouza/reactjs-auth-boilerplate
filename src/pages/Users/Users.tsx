import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { api } from '@/services'

type User = {
  id: number
  name: string
}

function Users() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get('/users')
        const users = response?.data?.users || []
        setUsers(users)
      } catch (error) {
        const err = error as AxiosError
        return err
      }
    }

    loadUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users?.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id} <strong>Name:</strong> {user.name}
            </li>
          ))
        ) : (
          <li>empty user list</li>
        )}
      </ul>
    </div>
  )
}

export default Users

import React, { FormEvent, useEffect, useState } from 'react'
import { useSession } from '@/hooks'

function initialFormValues() {
  return {
    email: '',
    password: ''
  }
}

function Login() {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useSession()

  const users = [
    { name: 'Admin', email: 'admin@site.com', password: 'password@123' },
    { name: 'Client', email: 'client@site.com', password: 'password@123' }
  ]

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const user = event.target.value
    setValues(JSON.parse(user))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    try {
      await signIn(values)
    } catch (error) {
      /**
       * an error handler can be added here
       */
    } finally {
      setLoginRequestStatus('success')
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <select name="select-user" onChange={handleUserChange}>
          <option value="" style={{ display: 'none' }}>
            Select an user to test
          </option>
          {users.map((user) => (
            <option key={user.email} value={JSON.stringify(user)}>
              {user.name}
            </option>
          ))}
        </select>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            id="email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loginRequestStatus === 'loading'}>
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Login

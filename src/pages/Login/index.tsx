import React, { FormEvent, useEffect, useState } from 'react'

import { useUserSession } from '../../hooks/useUserSession'

function initialFormValues () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useUserSession()

  const users = [
    { name: 'Admin', email: 'admin@site.com', password: 'password@123' },
    { name: 'Client', email: 'client@site.com', password: 'password@123' }
  ]

  function handleUserChange (event: React.ChangeEvent<HTMLSelectElement>) {
    const user = JSON.parse(event.target.value)
    if (user) setValues(user)
  }

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    setLoginRequestStatus('loading')

    await signIn(values)

    setLoginRequestStatus('success')
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div>
      <select onChange={handleUserChange}>
        <option>Select an user to test</option>
        {users.map(user => (
          <option key={user.email} value={JSON.stringify(user)}>
            {user.name}
          </option>
        ))}
      </select>

      <form
        noValidate
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            id="email"
            data-testid="login-input-email"
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
            data-testid="login-input-password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={loginRequestStatus === 'loading'}
        >
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

import React, { FormEvent, useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'

function initialFormValues () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [values, setValues] = useState(initialFormValues)
  const [loginRequestStatus, setLoginRequestStatus] = useState('success')
  const { signIn } = useContext(AuthContext)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    setLoginRequestStatus('loading')

    try {
      e.preventDefault()
      await signIn(values)
      setLoginRequestStatus('success')
    } catch (error) {
      setLoginRequestStatus('error')
    }
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus('success')
  }, [])

  return (
    <div>
      <h1>Login</h1>

      <form
        noValidate
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            data-testid="login-input-email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
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

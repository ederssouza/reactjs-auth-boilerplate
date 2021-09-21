import React, { FormEvent, useContext, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'

function initialFormValues () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [values, setValues] = useState(initialFormValues)
  const { signIn } = useContext(AuthContext)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    await signIn(values)
  }

  return (
    <div>
      <h1>Login</h1>

      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

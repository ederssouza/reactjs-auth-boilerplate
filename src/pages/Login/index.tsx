import React, { FormEvent, useState } from 'react'

function initialFormFields () {
  return {
    email: '',
    password: ''
  }
}

export function Login () {
  const [fields, setFields] = useState(initialFormFields)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const field = e.target.name
    const value = e.target.value

    setFields({
      ...fields,
      [field]: value
    })
  }

  function resetFormFields () {
    setFields(initialFormFields)
  }

  function handleSubmit (e: FormEvent) {
    e.preventDefault()

    console.log(fields)

    resetFormFields()
  }

  return (
    <div>
      <h1>Login</h1>

      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            value={fields.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            value={fields.password}
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

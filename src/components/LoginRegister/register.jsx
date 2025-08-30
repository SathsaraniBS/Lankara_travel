import React from 'react'

function register() {
  return (
    <div className='register'>
        <h1>Register</h1>
        <form className='register-form'>
            <input type="text" placeholder='Username' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      
    </div>
  )
}

export default register

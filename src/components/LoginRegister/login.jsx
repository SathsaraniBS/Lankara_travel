import React from 'react'

function login() {
  return (
    <div className='login'>
        <h1>Login</h1>
        <form className='login-form'>
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password' />
            <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      
    </div>
  )
}

export default login

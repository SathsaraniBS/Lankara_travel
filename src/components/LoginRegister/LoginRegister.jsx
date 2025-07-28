import React from 'react'
import './LoginRegister.css'
import { FaUserAlt , FaLock} from "react-icons/fa";

function LoginRegister() {
  return (
    <div className='wrapper'>
        <div className='from-box login'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required/>
                    <FaUserAlt className='icon'/>

                </div>

                <div className='input-box'>
                    <input type='Password' placeholder='Password' required/>
                    <FaLock className='icon'/>
                </div>

                <div className='remember-forgot'>
                    <label><input type='checkbox'/> Remember me</label>
                    <a href='#'>Forgot Password</a>
                </div>

                <button type='submit'>Login</button>

                <div className='login register'>
                    <p>Don't have an account? <a href='#' className='register-link'>Register</a></p>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default LoginRegister
import React from 'react'
import './LoginRegister.css'
import { FaUserAlt , FaLock} from "react-icons/fa";
import React, { useState } from 'react';
function LoginRegister() {

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };
        
    
  return (
    <div className={'wrapper${action}'}>
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
                    <p>Don't have an account? <a href='#' onClick={registerLink} className='register-link'>Register</a></p>
                </div>
            </form>
        </div>

         <div className='from-box register'>
            <form action=''>
                <h1>Create Account</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required/>
                    <FaUserAlt className='icon'/>

                </div>

                <div className='input-box'>
                    <input type='Password' placeholder='Password' required/>
                    <FaLock className='icon'/>
                </div>

                <div className='input-box'>
                    <input type='Password' placeholder='Confirm Password' required/>
                    <FaLock className='icon'/>
                </div>

                <div className='remember-forgot'>
                    <label><input type='checkbox'/>I agree to the terms & conditions</label>
                </div>

                <button type='submit'>Register</button>

                <div className='login register'>
                    <p>Already have an account? <a href='#' onClick={loginLink} className='register-link'>Login</a></p>
                </div>
            </form>
        </div>

         
      
    </div>
  )
}

export default LoginRegister
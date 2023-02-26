import React from 'react'

const ForgotPass = ()=>{
    return(
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input type="text" placeholder='User Name' />
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='Password' />
                <button>Register</button>
                <p>There are an error</p>
                <span>Have an account?<a href="./Login">Login</a></span>
            </form>
        </div>
    )
}

export default ForgotPass
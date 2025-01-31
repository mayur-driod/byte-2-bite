import React from 'react'

function Login() {
  return (
    <>
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" name="Email" placeholder="Enter your email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="Password" placeholder="Enter your password" />
                </div>
                <div>
                    <input type="checkbox" />
                    <label>Remember me</label>
                </div>
                <button>Submit</button>
            </form>
        </div>
    </>
  )
}

export default Login
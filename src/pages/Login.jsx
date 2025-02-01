import React from 'react';
import './Login.css';  // Make sure this import is correct

function Login() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-header">Login</h1>
        <form>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input className="input-field" type="email" name="Email" placeholder="Enter your email" id="email" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input className="input-field" type="password" name="Password" placeholder="Enter your password" id="password" />
          </div>
          <div className="remember-me">
            <input className="checkbox" type="checkbox" />
            <label className="remember-label">Remember me</label>
          </div>
          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

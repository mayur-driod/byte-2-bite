import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { MdAccountCircle } from "react-icons/md";
import './Signup.css';

function Signup() {
  const [sign, setSign] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [visible, setVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSign((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlefilesubmit = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);

    if (file) {
      setAvatar(file);
      console.log('File path:', URL.createObjectURL(file));
    } else {
      console.error('No file selected');
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      console.error('No avatar file selected');
      return;
    }

    const formData = new FormData();

    formData.append('Name', sign.Name);
    formData.append('Email', sign.Email);
    formData.append('Password', sign.Password);
    formData.append('avatar', avatar);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('http://localhost:3000/create-user', formData, config);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="form-title">Sign Up!</h1>
        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="Name"
              value={sign.Name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="Email"
              value={sign.Email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="Password">Password</label>
            <input
              type={visible ? 'text' : 'password'}
              name="Password"
              value={sign.Password}
              onChange={handleChange}
              required
              className="input-field"
            />
            {visible ? (
              <AiOutlineEyeInvisible className="eye-icon" onClick={() => setVisible(false)} />
            ) : (
              <AiOutlineEye className="eye-icon" onClick={() => setVisible(true)} />
            )}
          </div>

          <div className="input-group">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              type={visible ? 'text' : 'password'}
              name="ConfirmPassword"
              value={sign.ConfirmPassword}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="avatar-upload">
            <label htmlFor="avatar" className="avatar-label">Upload your photo</label>
            <div className="avatar-preview">
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar" className="avatar-img" />
              ) : (
                <MdAccountCircle className="avatar-icon" />
              )}
            </div>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.png,.jpeg"
              onChange={handlefilesubmit}
              className="file-input"
            />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" value={agree} onChange={() => setAgree((prev) => !prev)} />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>

          <button type="submit" className="submit-btn" disabled={!agree}>
            Submit
          </button>

          <p className="login-link">
            Already a member? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import axios from 'axios';
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
    setSign(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      console.error("No avatar file selected");
      return;
    }

    const formData = new FormData();
    formData.append('Name', sign.Name);
    formData.append('Email', sign.Email);
    formData.append('Password', sign.Password);
    formData.append('avatar', avatar);

    try {
      const response = await axios.post('http://localhost:3000/create-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="Name" placeholder="Name" value={sign.Name} onChange={handleChange} required className="signup-input" />
          <input type="email" name="Email" placeholder="Email" value={sign.Email} onChange={handleChange} required className="signup-input" />
          
          <div className="password-container">
            <input 
              type={visible ? "text" : "password"} 
              name="Password" 
              placeholder="Password" 
              value={sign.Password} 
              onChange={handleChange} 
              required 
              className="signup-input" 
            />
            {visible ? (
              <AiOutlineEyeInvisible className="icon" onClick={() => setVisible(false)} />
            ) : (
              <AiOutlineEye className="icon" onClick={() => setVisible(true)} />
            )}
          </div>

          <input type={visible ? "text" : "password"} name="ConfirmPassword" placeholder="Confirm Password" value={sign.ConfirmPassword} onChange={handleChange} required className="signup-input" />
          
          <div className="signup-avatar-upload">
            <label htmlFor="file-input">Upload Avatar</label>
            <input type="file" id="file-input" accept=".jpg,.png,.jpeg" onChange={handleFileSubmit} />
            <span>{avatar ? <img src={URL.createObjectURL(avatar)} alt="avatar preview" /> : <MdAccountCircle size={30} />}</span>
          </div>

          <div className="signup-checkbox-container">
            <input type="checkbox" checked={agree} onChange={() => setAgree(prev => !prev)} />
            <label>I agree to the terms and conditions</label>
          </div>

          <button className="signup-submit" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

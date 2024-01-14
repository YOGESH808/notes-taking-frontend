import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        username: formData.usernameOrEmail,
        password: formData.password,
      };
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        requestData
      );
      console.log(response.data.token);
      if (response.statusText === 'OK') {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess(formData.usernameOrEmail);
        navigate('/notes', { replace: true });
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Username or Email:
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p style={{ margin: '10px 0 0 0' }}>
        Don't have an Account <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
}

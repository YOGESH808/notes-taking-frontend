import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
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
        onLoginSuccess();
        navigate("/notes",{replace:true});
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>
          Username or Email:
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    maxWidth: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    margin: '10px 0',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

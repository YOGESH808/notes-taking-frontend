import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
const navigate = useNavigate();
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        username: username,
        password: password,
      };
      if(username =='' || password===''){
        setError('Please enter a username and password');
        setTimeout(()=>{
          setError(null);
        },1500);
        return;
      }
      const response = await axios.post(
        'http://localhost:4000/api/auth/signup',
        formData
      );
      navigate("/login");
      
    } catch (error) {
      setError(error.message);
     
    }
  };

  return (
    
    <div style={styles.container}>
      {error && (
      <div className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center">
        {error}
      </div>
    ) }
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUserNameChange}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
      <p style={{margin:'10px 0 0 0'}}>Already have an Account <Link to = "/login">Login</Link></p>

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
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Signup;

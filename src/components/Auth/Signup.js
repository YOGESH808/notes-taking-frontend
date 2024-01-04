import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                "username":username,
                "password":password
            }
            const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
            console.log(response.data); // Handle success
          } catch (error) {
            console.error(error); // Handle error
          }

    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={username} onChange={handleUserNameChange} />
            </label>
            <br/>
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">SignUp</button>
        </form>
    );
}

export default Signup
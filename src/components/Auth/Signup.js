import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAlert = (alertType,msg)=>{
    setError({
      type: alertType,
      msg:msg
    });
    setTimeout(() => {
      setError(null);
    }, 1500);
  }

  const displayAlert = (alertType,msg)=>{
    return( <div className={`${alertType == "Success"?'bg-green-500':'bg-red-500'} p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center`}>
          {msg}
        </div>)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        username: username,
        password: password,
      };
      if (username === "" || password === "") {
        handleAlert("failure","Username and password is required");        
        return;
      }
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      handleAlert("Success","User registered successfully");
    } catch (error) {
      console.log(error);
      if(error.message)
      {
        handleAlert("failure",error.response.data.message);
      }
      else{
        handleAlert("failure",error.message);
      }
    }
  };

  return (
    <div>
      {error && (
        displayAlert(error.type,error.msg)
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUserNameChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an Account <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default Signup;

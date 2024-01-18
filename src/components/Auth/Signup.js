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
    <div className="min-h-screen flex">
    <div className="w-1/2 bg-gray-100 flex items-center justify-center">
      <div className="p-8 text-center space-y-4">
        {/* Content on the left side */}
      </div>
    </div>
    <div className="w-1/2 bg-white p-8 flex flex-col items-center">
      {error && displayAlert(error.type, error.msg)}
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUserNameChange}
            className="border appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="border appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <button
          type="submit"
          className="btn-login bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </form>
  
      <p className="text-center text-gray-600 text-sm mt-4">
        Already have an Account? <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">Login</Link>
      </p>
    </div>
  </div>
  
  );
}
export default Signup;

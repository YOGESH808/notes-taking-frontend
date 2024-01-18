import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAlert = (alertType, msg) => {
    setError({
      type: alertType,
      msg: msg,
    });
    setTimeout(() => {
      setError(null);
    }, 1500);
  };

  const displayAlert = (alertType, msg) => {
    return (
      <div
        className={`${
          alertType == "Success" ? "bg-green-500" : "bg-red-500"
        } p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center`}
      >
        {msg}
      </div>
    );
  };
  const { setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        username: formData.usernameOrEmail,
        password: formData.password,
      };
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        requestData
      );
      if (response.statusText === "OK") {
        localStorage.setItem("token", response.data.token);
        onLoginSuccess(formData.usernameOrEmail);
        setUser(formData.usernameOrEmail);
        navigate("/notes", { replace: true });
      } else {
        if (error.message) {
          handleAlert("failure", error.response.data.message);
        } else {
          handleAlert("failure", error.message);
        }
      }
    } catch (error) {
      if (error.message) {
        handleAlert("failure", error.response.data.message);
      } else {
        handleAlert("failure", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
    <div className="w-1/2 bg-gray-100 flex items-center justify-center">
      <div className="p-8 text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600">
          Log in to access your notes and continue where you left off.
        </p>
        <img src="/path/to/image.jpg" alt="App logo" width="200" />
      </div>
    </div>
    <div className="w-1/2 bg-white p-8 flex flex-col items-center">
      {error && displayAlert(error.type, error.msg)}
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
            Username or Email:
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            className="border appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
  
      <p className="text-center text-gray-600 text-sm mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">Sign Up</Link>
      </p>
    </div>
  </div>
  );
}

import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
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
    <>
      <div className="flex h-screen w-screen">
        <div className="left w-1/3">
          <p>Some Left design</p>
        </div>
        <div className="right w-2/3">
          <div className="login-container bg-slate-50">
            {error && displayAlert(error.type, error.msg)}
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
            <p style={{ margin: "10px 0 0 0" }}>
              Don't have an Account <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

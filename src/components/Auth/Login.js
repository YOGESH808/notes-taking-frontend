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
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(null), 1500);
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
            {error && (
              <div className="bg-red-500 p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center">
                {error}
              </div>
            )}
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

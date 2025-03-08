import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      console.log("Sending login request to backend...");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", response.data);

      // Check if the response contains the expected data
      if (response.data && response.data.name) {
        login({ name: response.data.name, role: "user" });
        navigate("/");
      } else {
        setError("Invalid response from the server. Please try again.");
      }
    } catch (error) {
      console.error("Login error 🤣:", error);
      if (error.response) {
        // Handle specific error messages from the backend
        setError(
          error.response.data.message || "Incorrect username or password."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="inner-box">
        <img src={`${process.env.PUBLIC_URL}/login.png`} alt="" />
        <div className="right-panel">
          <div className="title-text">
            Get Started at
            <p>Upstarters</p>
          </div>
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="credentials">
              <div className="email">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1719 0.982422H2.25C1.29287 0.982422 0.518467 1.76553 0.518467 2.72266L0.509766 13.1641C0.509766 14.1212 1.29287 14.9043 2.25 14.9043H16.1719C17.129 14.9043 17.9121 14.1212 17.9121 13.1641V2.72266C17.9121 1.76553 17.129 0.982422 16.1719 0.982422ZM16.1719 4.46289L9.21094 8.81348L2.25 4.46289V2.72266L9.21094 7.07324L16.1719 2.72266V4.46289Z"
                    fill="black"
                  />
                </svg>
                <div className="input-holder">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="pass">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.42842 12.4889V13.1415C7.42842 13.3146 7.35966 13.4806 7.23728 13.603C7.1149 13.7253 6.94891 13.7941 6.77583 13.7941H5.47067V14.4467C5.47067 14.7928 5.33316 15.1248 5.08839 15.3696C4.84363 15.6143 4.51165 15.7518 4.1655 15.7518H1.55517C1.20902 15.7518 0.877041 15.6143 0.632274 15.3696C0.387508 15.1248 0.25 14.7928 0.25 14.4467V12.7591C0.250074 12.413 0.387631 12.0811 0.632414 11.8363L5.68341 6.78535C5.3737 5.7337 5.40292 4.61123 5.76693 3.57711C6.13093 2.54299 6.81125 1.64971 7.71141 1.02392C8.61157 0.398134 9.68589 0.0716033 10.782 0.0906305C11.8782 0.109658 12.9405 0.473277 13.8184 1.12993C14.6963 1.78658 15.3452 2.70294 15.6731 3.74906C16.001 4.79519 15.9913 5.918 15.6452 6.95827C15.2992 7.99854 14.6345 8.90349 13.7453 9.54479C12.8561 10.1861 11.7876 10.5312 10.6913 10.5312H9.38486V11.8363C9.38486 12.0094 9.31611 12.1754 9.19473 12.2978C9.07335 12.4201 8.90736 12.4889 8.73428 12.4889H7.42842ZM5.67823 3.30165C5.98169 2.44395 6.56365 1.81628 7.28158 1.43726C7.99951 1.05825 8.85361 0.889514 9.68053 0.993531C10.5075 1.09755 11.2698 1.46577 11.7516 2.06425C12.2335 2.66273 12.3761 3.44424 12.1185 4.17245L6.78476 8.4167L5.67823 3.30165Z"
                    fill="black"
                  />
                </svg>
                <div className="input-holder">
                  <label htmlFor="pass">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="showPassword"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_14_190)">
                      <path d="..." fill="#2F2F2F" />
                    </g>
                    <defs>
                      <clipPath id="clip0_14_190">
                        <rect
                          width="12.7617"
                          height="12.7617"
                          fill="white"
                          transform="translate(0.457031 -0.00976562)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="forgot-password">
                <a href="">Forgot Password?</a>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <div className="sign-up-alternate">
                <div className="register">
                  Don't have an account?
                  <p onClick={() => navigate("/signup")}>Register</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
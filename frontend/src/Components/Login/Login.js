import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../utils/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
    const mockUser = { email, token: "123456" };
    login(mockUser); // Save user state
    alert("Login successful!");
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
                  <path d="..." fill="black" />
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
                  <p>Register</p>
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

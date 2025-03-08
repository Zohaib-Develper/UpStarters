import React, { useState } from "react";
import "./AdminLogin.css";
import { useAuth } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Ensure backend URL is defined
  const backendUrl = process.env.REACT_APP_BACKENDURL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/login`, // API URL
        { email, password }, // Request body
        { withCredentials: true } // Send cookies with request
      );

      setSuccessMessage("Login successful!");
      console.log("Response: ", response);

      // Ensure response data exists before using it
      login({ name: response.data?.name || "Admin", email, role: "admin" });

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error from backend:", error?.response?.data || error.message);
      setErrorMessage(error?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card shadow">
        <div className="login-header text-center">
          <div className="logo-placeholder">A</div>
          <h2 className="text-green">Admin Panel</h2>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-green">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-green">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-green">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

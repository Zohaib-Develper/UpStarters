import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../utils/AuthContext";

const VerifyOtp = () => {
  const { email } = useParams(); // Get the email from the URL
  const navigate = useNavigate(); // For navigation after OTP verification
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/users/verify-otp`,
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("OTP Verified Successfully!");
        login({ name: response.data.name, role: "user" });
        navigate("/"); // Redirect to home page on successful OTP verification
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "50px" }}>
      <div className="card" style={{ backgroundColor: "#ececec" }}>
        <div className="card-body">
          <h3 className="card-title text-center" style={{ color: "#028858" }}>
            Verify OTP
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                disabled
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="Enter OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{ backgroundColor: "#028858" }}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

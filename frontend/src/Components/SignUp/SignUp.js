import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const navigate = useNavigate();

  // Handle change for card number and apply formatting (XXXX-XXXX-XXXX-XXXX)
  const formatCardNumber = (value) => {
    let formatted = value.replace(/\D/g, "").slice(0, 16); // Remove non-digits and limit to 16 characters
    if (formatted.length <= 4) return formatted;
    if (formatted.length <= 8)
      return formatted.replace(/(\d{4})(\d{0,4})/, "$1-$2");
    if (formatted.length <= 12)
      return formatted.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1-$2-$3");
    return formatted.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1-$2-$3-$4");
  };

  const formatExpiry = (value) => {
    let formatted = value.replace(/\D/g, "").slice(0, 4); // Remove non-digits and limit to 4 characters
    if (formatted.length <= 2) return formatted;
    return formatted.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "cardNumber") {
      setCardNumber(formatCardNumber(value));
    } else if (name === "cvv") {
      setCvv(value.replace(/\D/g, "").slice(0, 3)); // Only digits, max 3 digits
    } else if (name === "expiry") {
      setExpiry(formatExpiry(value));
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      !cardNumber ||
      !cvv ||
      !expiry ||
      !firstName ||
      !lastName
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/users/signup`,
        {
          email,
          password,
          cardNumber,
          cvv,
          expiry,
          name: `${firstName} ${lastName}`, // Send the name in the 'name' field
        },
        {
          withCredentials: true,
        }
      );

      navigate(`/verify/${email}`);
    } catch (error) {
      alert("An error occurred. Please try again.");
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
          <form onSubmit={handleSubmit}>
            <div className="credentials">
              <div className="name-container">
                <div className="user-first-name">
                  <div className="input-holder">
                    <label htmlFor="user-first-name">First Name</label>
                    <input
                      type="text"
                      name="firstName" // Bind to firstName state
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="user-last-name">
                  <div className="input-holder">
                    <label htmlFor="user-last-name">Last Name</label>
                    <input
                      type="text"
                      name="lastName" // Bind to lastName state
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="email">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
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
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.42842 12.4889V13.1415C7.42842 13.3146 7.35966 13.4806 7.23728 13.603C7.1149 13.7253 6.94891 13.7941 6.77583 13.7941H5.47067V14.4467C5.47067 14.7928 5.33316 15.1248 5.08839 15.3696C4.84363 15.6143 4.51165 15.7518 4.1655 15.7518H1.55517C1.20902 15.7518 0.877041 15.6143 0.632274 15.3696C0.387508 15.1248 0.25 14.7928 0.25 14.4467V12.7591C0.250074 12.413 0.387631 12.0811 0.632414 11.8363L5.68341 6.78535C5.3737 5.7337 5.40292 4.61123 5.76693 3.57711C6.13093 2.54299 6.81125 1.64971 7.71141 1.02392C8.61157 0.398134 9.68589 0.0716033 10.782 0.0906305C11.8782 0.109658 12.9405 0.473277 13.8184 1.12993C14.6963 1.78658 15.3452 2.70294 15.6731 3.74906C16.001 4.79519 15.9913 5.918 15.6452 6.95827C15.2992 7.99854 14.6345 8.90349 13.7453 9.54479C12.8561 10.1861 11.7876 10.5312 10.6913 10.5312H9.38486V11.8363C9.38486 12.0094 9.31611 12.1754 9.19473 12.2978C9.07335 12.4201 8.90736 12.4889 8.73428 12.4889H7.42842ZM5.67823 3.30165C5.98169 2.44395 6.56365 1.81628 7.28158 1.43726C7.99951 1.05825 8.85361 0.889514 9.68053 0.993531C10.5075 1.09755 11.2698 1.46577 11.7516 2.06425C12.2335 2.66273 12.3761 3.44424 12.1185 4.17245L6.78476 8.4167L5.67823 3.30165Z"
                    fill="black"
                  />
                </svg>
                <div className="input-holder">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={handleChange}
                  />
                  <div
                    className="showPassword"
                    onClick={togglePasswordVisibility}>
                    <svg
                      width="14"
                      height="13"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_14_190)">
                        <path
                          d="M8.83197 6.37122C8.83197 6.90006 8.62189 7.40725 8.24794 7.7812C7.87398 8.15515 7.3668 8.36523 6.83795 8.36523C6.30911 8.36523 5.80192 8.15515 5.42797 7.7812C5.05402 7.40725 4.84393 6.90006 4.84393 6.37122C4.84393 5.84237 5.05402 5.33518 5.42797 4.96123C5.80192 4.58728 6.30911 4.3772 6.83795 4.3772C7.3668 4.3772 7.87398 4.58728 8.24794 4.96123C8.62189 5.33518 8.83197 5.84237 8.83197 6.37122Z"
                          fill="#2F2F2F"
                        />
                        <path
                          d="M0.457031 6.37109C0.457031 6.37109 2.84985 1.98425 6.83789 1.98425C10.8259 1.98425 13.2188 6.37109 13.2188 6.37109C13.2188 6.37109 10.8259 10.7579 6.83789 10.7579C2.84985 10.7579 0.457031 6.37109 0.457031 6.37109ZM6.83789 9.16272C7.57828 9.16272 8.28834 8.8686 8.81187 8.34507C9.3354 7.82154 9.62952 7.11148 9.62952 6.37109C9.62952 5.63071 9.3354 4.92065 8.81187 4.39712C8.28834 3.87358 7.57828 3.57947 6.83789 3.57947C6.09751 3.57947 5.38744 3.87358 4.86391 4.39712C4.34038 4.92065 4.04626 5.63071 4.04626 6.37109C4.04626 7.11148 4.34038 7.82154 4.86391 8.34507C5.38744 8.8686 6.09751 9.16272 6.83789 9.16272Z"
                          fill="#2F2F2F"
                        />
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
              </div>
              <div className="card-number">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 78.22">
                  <defs></defs>
                  <title>credit-card-payment</title>
                  <path
                    class="cls-1"
                    d="M11.24,58h17V62.1h-17V58Zm75.4-13A9.77,9.77,0,0,1,94.51,49a9.85,9.85,0,1,1,0,11.76A9.84,9.84,0,1,1,86.64,45Zm29.48,29.29A2.94,2.94,0,0,0,119,71.48V34H3.9V71.48a2.64,2.64,0,0,0,.82,2,2.87,2.87,0,0,0,2,.85ZM6.74,78.2a6.55,6.55,0,0,1-4.76-2,6.58,6.58,0,0,1-2-4.75V6.74A6.72,6.72,0,0,1,6.74,0H116.12a6.76,6.76,0,0,1,6.76,6.74V71.48a6.68,6.68,0,0,1-2,4.75,6.81,6.81,0,0,1-4.77,2q-54.74,0-109.38,0ZM3.9,14.56H119V6.73a2.75,2.75,0,0,0-.87-2,2.81,2.81,0,0,0-2-.87H6.74a2.8,2.8,0,0,0-2,.87,2.76,2.76,0,0,0-.82,2v7.83ZM36.09,58H64.38V62.1H36.09V58Z"
                  />
                </svg>
                <div className="input-holder">
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={cardNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="expiry-cvv-container">
                <div className="cvv">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 78.22">
                    <defs></defs>
                    <title>credit-card-payment</title>
                    <path
                      class="cls-1"
                      d="M11.24,58h17V62.1h-17V58Zm75.4-13A9.77,9.77,0,0,1,94.51,49a9.85,9.85,0,1,1,0,11.76A9.84,9.84,0,1,1,86.64,45Zm29.48,29.29A2.94,2.94,0,0,0,119,71.48V34H3.9V71.48a2.64,2.64,0,0,0,.82,2,2.87,2.87,0,0,0,2,.85ZM6.74,78.2a6.55,6.55,0,0,1-4.76-2,6.58,6.58,0,0,1-2-4.75V6.74A6.72,6.72,0,0,1,6.74,0H116.12a6.76,6.76,0,0,1,6.76,6.74V71.48a6.68,6.68,0,0,1-2,4.75,6.81,6.81,0,0,1-4.77,2q-54.74,0-109.38,0ZM3.9,14.56H119V6.73a2.75,2.75,0,0,0-.87-2,2.81,2.81,0,0,0-2-.87H6.74a2.8,2.8,0,0,0-2,.87,2.76,2.76,0,0,0-.82,2v7.83ZM36.09,58H64.38V62.1H36.09V58Z"
                    />
                  </svg>
                  <div className="input-holder">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="expiry">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 78.22">
                    <defs></defs>
                    <title>credit-card-payment</title>
                    <path
                      class="cls-1"
                      d="M11.24,58h17V62.1h-17V58Zm75.4-13A9.77,9.77,0,0,1,94.51,49a9.85,9.85,0,1,1,0,11.76A9.84,9.84,0,1,1,86.64,45Zm29.48,29.29A2.94,2.94,0,0,0,119,71.48V34H3.9V71.48a2.64,2.64,0,0,0,.82,2,2.87,2.87,0,0,0,2,.85ZM6.74,78.2a6.55,6.55,0,0,1-4.76-2,6.58,6.58,0,0,1-2-4.75V6.74A6.72,6.72,0,0,1,6.74,0H116.12a6.76,6.76,0,0,1,6.76,6.74V71.48a6.68,6.68,0,0,1-2,4.75,6.81,6.81,0,0,1-4.77,2q-54.74,0-109.38,0ZM3.9,14.56H119V6.73a2.75,2.75,0,0,0-.87-2,2.81,2.81,0,0,0-2-.87H6.74a2.8,2.8,0,0,0-2,.87,2.76,2.76,0,0,0-.82,2v7.83ZM36.09,58H64.38V62.1H36.09V58Z"
                    />
                  </svg>
                  <div className="input-holder">
                    <label htmlFor="expiry">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

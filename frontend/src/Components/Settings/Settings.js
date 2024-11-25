import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Mamoon Ahmad",
    email: "mamoon.ahmad@example.com",
    cardNumber: "1234-5678-9012-3456",
    cvv: "123",
    expiry: "12/25",
  });

  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-header">
          <h4>Settings</h4>
        </div>
        <div className="settings-body">
          <div className="settings-profile">
            <div className="settings-image">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="settings-input"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            <div className="settings-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="settings-input"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="settings-form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="settings-input"
                value={profile.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="settings-row">
              <div className="settings-form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="settings-input"
                  value={profile.cvv}
                  onChange={handleChange}
                />
              </div>
              <div className="settings-form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  className="settings-input"
                  value={profile.expiry}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Change Password Section */}
            <div className="settings-form-group">
              <label>Change Password</label>
              {!showPasswordInput ? (
                <p
                  className="settings-link"
                  onClick={() => setShowPasswordInput(true)}>
                  Click here to change your password
                </p>
              ) : (
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  className="settings-input"
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="settings-button-container">
              <button type="submit" className="settings-save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

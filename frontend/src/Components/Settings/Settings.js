import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const Settings = () => {
  const [profile, setProfile] = useState({});
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/users`, { withCredentials: true })
      .then((response) => setProfile(response.data.data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_BACKENDURL}/api/users`, profile, {
        withCredentials: true,
      })
      .then(() => alert("Profile updated successfully!"))
      .catch(() => alert("Error updating profile! Please try again later."));
  };

  const handleUpdatePassword = () => {
    axios
      .patch(`${process.env.REACT_APP_BACKENDURL}/api/users/updatePassword`, passwordData, {
        withCredentials: true,
      })
      .then(() => {
        alert("Password updated successfully!");
        setShowPasswordModal(false);
        setPasswordData({ oldPassword: "", newPassword: "" });
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("Something Went wrong! Please try again later");
      });
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card p-3 shadow-lg">
        <h2 className="text-center mb-4">Account Settings</h2>

        <form onSubmit={handleSave}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={profile.name || ""}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={profile.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="form-control"
                value={profile.cardNumber || ""}
                onChange={handleChange}
                placeholder="Enter card number"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className="form-control"
                value={profile.cvv || ""}
                onChange={handleChange}
                placeholder="CVV"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="expiry" className="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                className="form-control"
                value={profile.expiry || ""}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>
          </div>

          <div className="mb-4">
            <p
              className="text-success text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPasswordModal(true)}>
              Change your password
            </p>
            <button type="submit" className="save-button btn btn-success">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal fade show d-block mt-5 " tabIndex="-1">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className="form-control"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    minLength="8"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdatePassword}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

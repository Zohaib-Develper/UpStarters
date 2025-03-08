import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaThLarge, FaUser, FaFile, FaPowerOff } from "react-icons/fa";
import "./Sidebar.css";
import axios from "axios";
import { useAuth } from "../../../utils/AuthContext";

const setInitialIcon = (path) => {
  if (path.includes("dashboard")) return "dashboard";
  else if (path.includes("users")) return "users";
  else return "projects";
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState(() => setInitialIcon(pathname)); // Default active section
  const [showLogout, setShowLogout] = useState(false); // State to show/hide logout button
  const { logout } = useAuth();

  const handleNavigation = (section, path) => {
    setActive(section); // Update active section
    navigate(path); // Navigate to the specified route
  };

  const toggleLogoutButton = () => {
    setShowLogout((prev) => !prev); // Toggle visibility of the logout button
  };

  const handleLogout = () => {
    logout();

    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}/api/users/logout`, // Backend API URL
        {},
        { withCredentials: true } // Axios config for credentials
      )
      .then(() => {
        logout();
        navigate("/"); // Use a relative path for navigation
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu d-flex flex-column gap-4">
        <FaThLarge
          size={20}
          className={`icon ${active === "dashboard" ? "active" : ""}`}
          onClick={() => handleNavigation("dashboard", "/admin/dashboard")}
        />
        <FaUser
          size={20}
          className={`icon ${active === "users" ? "active" : ""}`}
          onClick={() => handleNavigation("users", "/admin/users")}
        />
        <FaFile
          size={20}
          className={`icon ${active === "projects" ? "active" : ""}`}
          onClick={() => handleNavigation("projects", "/admin/projects")}
        />
      </div>
      <div className="sidebar-footer">
        <FaPowerOff
          size={20}
          className={`icon ${active === "logout" ? "active" : ""}`}
          onClick={toggleLogoutButton} // Toggle the logout button
        />
        {showLogout && (
          <button className="logout-button" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

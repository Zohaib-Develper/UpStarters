import React from "react";
import "./Header.css";
import { useAuth } from "../../../utils/AuthContext";

const Header = () => {
  let { user } = useAuth();
  return (
    <div className="header d-flex align-items-end justify-content-end px-lg-5 py-2">
      <span className="d-flex flex-row justify-content-center align-items-center gap-2">
        {" "}
        <div className="profile-pic"></div>
        <span className="d-flex flex-column">
          <small className="fw-bold">
            {" "}
            {user.username[0].toUpperCase() + user.username.slice(1)}
          </small>
          <small>Admin</small>
        </span>
      </span>
    </div>
  );
};

export default Header;

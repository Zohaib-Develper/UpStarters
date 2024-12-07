import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Category from "../Category/Category";
import SidePanel from "../SidePanel/SidePanel";
import { useAuth } from "../../utils/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidePanel = document.querySelector(".side-panel");
      const profileIcon = document.querySelector(".profile");

      if (
        isSidePanelOpen &&
        sidePanel &&
        !sidePanel.contains(event.target) &&
        !profileIcon.contains(event.target)
      ) {
        setIsSidePanelOpen(false);
      }
    };

    if (isSidePanelOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidePanelOpen]);

  if (pathname.includes("signup") || pathname.includes("login")) return "";
  const togglePanel = (e) => {
    e.stopPropagation();
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="app-container">
      <div className={`main-content ${isSidePanelOpen ? "blur-content" : ""}`}>
        <nav className="navbar navbar-expand bg-body-light pt-0 d-flex justify-content-between align-items-center">
          <div className="NavBarLogo d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src={`${process.env.PUBLIC_URL}/logo1.ico`}
                className="d-inline-block align-middle"
                alt=""
                style={{ maxHeight: "60px", width: "auto" }}
              />
              <p className="mt-3 fs-3 mb-0">
                <b>UPSTARTERS</b>
              </p>
            </Link>
          </div>
          <div className="search-bar input-group pt-3">
            <input
              type="search"
              placeholder="Search Projects, Creators, and Investors"
              className="form-control border-0"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`?search=${search}`);
                }
              }}
              style={{
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <span
              className="input-group-text"
              style={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`?search=${search}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </div>
          {user ? (
            <div className="profile mt-3" onClick={togglePanel}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </div>
          ) : (
            <div className="d-flex me-3 mt-3">
              <Link to="/login" className="nav-button">
                <button
                  className="btn btn-outline-success me-2 d-flex align-items-center justify-content-center"
                  style={{ height: "33px" }}
                >
                  Log In
                </button>
              </Link>
              <Link to="/signup" className="nav-button">
                <button
                  className="btn btn-success d-flex align-items-center justify-content-center"
                  style={{ height: "33px" }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>
        <Category />
      </div>
      <SidePanel
        isOpen={isSidePanelOpen}
        closePanel={() => setIsSidePanelOpen(false)}
        user={user}
      />
      {/* Separate overlay div */}
      {isSidePanelOpen && (
        <div className="overlay" onClick={() => setIsSidePanelOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;

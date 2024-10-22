import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../Category/Category';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <style>
          {`
            .nav-button {
              text-decoration: none; /* Remove underline */
            }
          `}
        </style>
        <nav className="navbar navbar-expand-lg bg-body-light pt-0">
          <div className="container-fluid">
            <div className="NavBarLogo">
              <Link className="navbar-brand d-flex align-items-center" to="/">
                <img
                  src={`${process.env.PUBLIC_URL}/logo1.ico`}
                  className="d-inline-block align-middle"
                  alt=""
                  style={{ maxHeight: '60px', width: 'auto' }}
                />
                <p className="mt-3 fs-3 mb-0">
                  <b>UPSTARTERS</b>
                </p>
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-components d-flex justify-content-between w-100">
                <div className="input-group ms-5 mt-3" style={{ width: '400px' }}>
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
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
                  <input
                    type="search"
                    placeholder="Search Projects, Creators, and Investors"
                    className="form-control border-0"
                    aria-label="Search"
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                  />
                </div>
                <div className="d-flex ms-auto mt-3">
                  <Link to="/login" className="nav-button">
                    <button
                      className="btn btn-outline-success me-2 d-flex align-items-center justify-content-center"
                      style={{ height: '33px' }}
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" className="nav-button">
                    <button
                      className="btn btn-success d-flex align-items-center justify-content-center"
                      style={{ height: '33px' }}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Category />
      </div>
    );
  }
}

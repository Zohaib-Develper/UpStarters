import React, { Component } from 'react';
import './Login.css'; // Import the CSS file

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    // Here, you would usually handle the form submission (e.g., sending the data to the backend)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success btn-block">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

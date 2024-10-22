import React, { Component } from 'react';
import './SignUp.css'; // Import the CSS file

export default class SignUp extends Component {
  state = {
    name: '',
    phone:'',
    email: '',
    password: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, password } = this.state;
    // handle the form submission (backend)
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  render() {
    return (
      <div className="signup-container">
        <div className="signup-form-container">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                placeholder="Enter your Phone Number"
                required
              />
            </div>
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account? <a href="#">Log In</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

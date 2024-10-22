import React, { Component } from "react";
import "./Category.css";
export default class Category extends Component {
  render() {
    return (
      <div className="category-container p-3 bg-body-light">
        <div className="container">
          <div className="row">
            <ul className="list-inline d-flex justify-content-between flex-wrap w-100">
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Technology</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Art</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Design</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Music</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Film</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Food</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Gaming</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Photography</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Fashion</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Health</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Sports</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Publishing</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Comics</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Education</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-dark">Travel</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    );
  }
}

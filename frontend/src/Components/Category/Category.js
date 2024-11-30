import React, { useState } from "react";
import "./Category.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  // List of categories
  const categories = [
    "Technology",
    "Art",
    "Design",
    "Music",
    "Film",
    "Food",
    "Gaming",
    "Photography",
    "Fashion",
    "Health",
    "Sports",
    "Publishing",
    "Comics",
    "Education",
    "Travel",
  ];

  // Function to handle category click and fetch data
  const handleCategoryClick = async (category) => {
    navigate(`/?category=${category}`);
  };

  return (
    <div className="category-container p-3 bg-body-light">
      <div className="container">
        <div className="row">
          <ul className="list-inline d-flex justify-content-between flex-wrap w-100">
            {categories.map((category, index) => (
              <li className="list-inline-item" key={index}>
                <a
                  href="#"
                  className="text-decoration-none text-dark"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handleCategoryClick(category); // Handle category click
                  }}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;

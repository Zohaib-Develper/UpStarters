import React, { useState } from "react";
import "./CreateProject.css";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fundingGoal: "",
    category: "",
  });

  const [previewImages, setPreviewImages] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit the form data to the backend
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="create-project-container">
      <h3 className="text-center mb-4">Create Project</h3>
      <form onSubmit={handleSubmit} className="container">
        {/* Project Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Project Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="form-control"
            required
          ></textarea>
        </div>

        {/* Funding Goal */}
        <div className="mb-3">
          <label htmlFor="fundingGoal" className="form-label">
            Funding Goal*
          </label>
          <input
            type="number"
            id="fundingGoal"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Science">Science</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Upload Images*
          </label>
          <input
            type="file"
            id="images"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>

        {/* Image Preview */}
        <div className="image-preview mb-3">
          {previewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="preview-thumbnail"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;

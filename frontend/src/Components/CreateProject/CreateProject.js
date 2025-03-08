import React, { useState } from "react";
import "./CreateProject.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fundingGoal: "",
    category: "",
  });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("fundingGoal", formData.fundingGoal);
    formDataToSend.append("category", formData.category);

    // Add Image File
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    try {
      // Send Data to Backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/projects`,
        formDataToSend,
        {
          withCredentials: true,
        }
      );

      console.log("Project created successfully:", response.data);
      navigate("/"); // Navigate to home or another page
    } catch (error) {
      console.error("Error creating project:", error.response || error);
    }
  };

  return (
    <div className="create-project-container">
      <h3 className="text-center mb-4">Create Project</h3>
      <form
        onSubmit={handleSubmit}
        className="container"
        enctype="multipart/form-data">
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
            required></textarea>
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
            required>
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Science">Science</option>
            <option value="Design">Design</option>
            <option value="Music">Music</option>
            <option value="Film">Film</option>
            <option value="Food">Food</option>
            <option value="Gaming">Gaming</option>
            <option value="Photography">Photography</option>
            <option value="Fashion">Fashion</option>
            <option value="Health">Health</option>
            <option value="Publishing">Publishing</option>
            <option value="Comics">Comics</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image*
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>

        {/* Image Preview */}
        <div className="image-preview mb-3">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="preview-thumbnail"
            />
          )}
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

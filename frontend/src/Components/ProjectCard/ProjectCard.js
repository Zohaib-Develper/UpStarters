import React from "react";
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";
const ProjectCard = ({
  id,
  title,
  creatorName,
  description,
  category,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`); // Navigate to the project details page using the project ID
  };
  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-image">
        <img src={imageUrl} alt={title} />
        <div className="partition"></div>
      </div>
      <div className="project-info">
        <h5 className="project-title">{title}</h5>
        <p className="project-description">{description}</p>
        <p className="project-creator">By: {creatorName}</p>
        <p className="project-category">Category: {category}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

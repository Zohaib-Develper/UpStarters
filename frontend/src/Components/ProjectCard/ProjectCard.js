import React from "react";
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";
const ProjectCard = ({
  id,
  title,
  creatorName,
  creatorId,
  description,
  category,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${id}`);
  };
  console.log("IAMGE: ", imageUrl);
  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-image">
        <img src={imageUrl} alt={title} />
        <div className="partition"></div>
      </div>
      <div className="project-info">
        <h5 className="project-title">{title}</h5>
        <p className="project-description">{description}</p>
        <p
          className="project-creator"
          onClick={() => navigate(`users/${creatorId}`)}
        >
          By: {creatorName}
        </p>
        <p className="project-category">Category: {category}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

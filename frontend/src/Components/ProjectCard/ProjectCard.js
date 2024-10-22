import React from "react";
import "./ProjectCard.css"; // Ensure to import your CSS file

const ProjectCard = ({
  title,
  creatorName,
  description,
  fundingGoal,
  currentFunding,
  imageUrl,
}) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "12px" }}>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{creatorName}</p>
        <p className="card-text">{description}</p>
        <p>
          Funding Goal: ${fundingGoal} <br />
          Current Funding: ${currentFunding}
        </p>
        <a href="#" className="btn btn-success">
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;

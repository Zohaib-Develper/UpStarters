import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const location = useLocation();
  const { id } = useParams();
  const project = location.state;

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <div className="project-details-information">
        <div className="project-details-header">
          <h4 className="project-details-title">{project.title}</h4>
          <p className="project-details-description">{project.description}</p>
        </div>
        <div className="project-details-content">
          <div className="project-details-image">
            <img src={project.imageUrl} alt={project.title} />
          </div>
          <div className="project-details-right">
            <div className="green-line"></div>
            <div className="funds-required">{project.FundsRequired}</div>
            <div className="funds-collected">
              Funds Collected as of today: {project.FundsCollected}
            </div>
            <div className="project-details-creator">
              <div className="user-profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </div>
              <div className="user-name">{project.creatorName}</div>
            </div>
            <div className="project-details-category">
              <i>Category: {project.category}</i>
            </div>
            <button className="back-project-button">Back this Project</button>
          </div>
        </div>
        <div className="related-projects mb-5">
          <h4 className="mt-5 ms-3">Related Projects</h4>
          {/* {get all the projects of the same category only 3 projects not more than that} */}
        </div>
      </div>
    </div>
  );
}

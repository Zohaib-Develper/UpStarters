import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectList.css";
import axios from "axios";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:80/api/projects/all", { withCredentials: true })
      .then((res) => setProjects(res.data.data))
      .catch((e) => console.log("Error: ", e));
  }, []);

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project?._id}
          id={project?._id} // Add this line
          title={project.title}
          creatorName={project.creator.name}
          creatorId={project.creator.id}
          description={project.description}
          category={project.category}
          imageUrl={project.image}
        />
      ))}
    </div>
  );
};

export default ProjectList;

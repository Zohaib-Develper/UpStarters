import React, { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectList.css"
const ProjectList = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Project A",
      creatorName: "Mamoon Ahmad",
      description: "An amazing project that will change the world.",
      category:"Technology",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Project B",
      creatorName: "Mamoon Ahmad",
      description: "An amazing project that will change the world.",
      category:"Technology",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "Project C",
      creatorName: "Mamoon Ahmad",
      description: "An amazing project that will change the world.",
      category:"Technology",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      title: "Project D",
      creatorName: "Mamoon Ahmad",
      description: "An amazing project that will change the world.",
      category:"Technology",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 5,
      title: "Project E",
      creatorName: "Mamoon Ahmad",
      description: "An amazing project that will change the world.",
      category:"Technology",
      imageUrl: "https://via.placeholder.com/300",
    },
  ]);

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          creatorName={project.creatorName}
          description={project.description}
          category={project.category}
          imageUrl={project.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProjectList;

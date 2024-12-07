import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectList.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const search = params.get("search")?.toLowerCase();

  useEffect(() => {
    if (search) {
      console.log("SETTING: ", projects);
      console.log("Based on : ", search);
      setProjects(
        projects.filter(
          (item) =>
            item.creator.name.toLowerCase().includes(search) ||
            item.title?.toLowerCase().includes(search) ||
            item.category?.toLowerCase().includes(search) ||
            item.description?.toLowerCase().includes(search)
        )
      );
    } else if (category)
      axios
        .get(`http://localhost:80/api/projects/category/${category}`, {
          withCredentials: true,
        })
        .then((res) => setProjects(res.data.data))
        .catch((e) => console.log("Error: ", e));
    else
      axios
        .get("http://localhost:80/api/projects/all", { withCredentials: true })
        .then((res) => setProjects(res.data.data))
        .catch((e) => console.log("Error: ", e));
  }, [category, search]);

  return (
    <>
      {search && <h5 className="ms-lg-5">Search Results for {search}</h5>}
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
    </>
  );
};

export default ProjectList;

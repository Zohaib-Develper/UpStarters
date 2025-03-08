import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import "./ProjectList.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]); // Store all projects
  const [filteredProjects, setFilteredProjects] = useState([]); // Store filtered projects

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const search = params.get("search")?.toLowerCase();

  // console.log("Backend URL:", import.meta.env.VITE_REACT_APP_BACKENDURL);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url = `${process.env.REACT_APP_BACKENDURL}/api/projects/all`;
        if (category) {
          url = `${process.env.REACT_APP_BACKENDURL}/api/projects/category/${category}`;
        }

        const res = await axios.get(url, { withCredentials: true });

        if (Array.isArray(res.data.data)) {
          setProjects(res.data.data);
          setFilteredProjects(res.data.data); // Initially set both states
        } else {
          console.error("Unexpected API response:", res.data);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [category]);

  useEffect(() => {
    if (search) {
      setFilteredProjects(
        projects.filter(
          (item) =>
            item?.creator?.name?.toLowerCase().includes(search) ||
            item?.title?.toLowerCase().includes(search) ||
            item?.category?.toLowerCase().includes(search) ||
            item?.description?.toLowerCase().includes(search)
        )
      );
    } else {
      setFilteredProjects(projects); // Reset if no search
    }
  }, [search, projects]);

  return (
    <>
      {search && <h5 className="ms-lg-5">Search Results for {search}</h5>}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) =>
            project ? (
              <ProjectCard
                key={project?._id}
                id={project?._id}
                title={project?.title || "Untitled"}
                creatorName={project?.creator?.name || "Unknown"}
                creatorId={project?.creator?.id || "N/A"}
                description={project?.description || "No description available"}
                category={project?.category || "Uncategorized"}
                imageUrl={project?.image || "default-image.jpg"}
              />
            ) : null
          )
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};

export default ProjectList;
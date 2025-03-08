import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProjectsTable = () => {
  // Sample project data
  const [projects, setProjects] = useState([]);
  console.log("ROJECT: ", projects);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/admin/projects`, {
        withCredentials: true,
      })
      .then((res) => setProjects(res.data.projects));
  }, []);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered projects based on the search term
  const filteredProjects = projects.filter(
    (project) => true
    // project?.creator?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler to view project details
  const handleView = (project) => {
    alert(`Viewing details for project created by ${project.creator}`);
  };

  // Handler to delete a project
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      alert(`Project with ID ${id} deleted.`);
      axios.delete(`${process.env.REACT_APP_BACKENDURL}/api/admin/projects/${id}`, {
        withCredentials: true,
      });
      setProjects(projects.filter((project) => project._id != id));
    }
  };

  return (
    <div className="container mt-1">
      <h3 className="mb-2">Projects</h3>

      {/* Search Input */}
      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by creator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table
        className="table table-striped"
        style={{ backgroundColor: "#fff" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Total Investment Collected</th>
            <th>Date of Creation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.title}</td>
                <td>{project?.creator?.name}</td>
                <td>${project?.fundsRaised?.toLocaleString()}</td>
                <td>{new Date(project?.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

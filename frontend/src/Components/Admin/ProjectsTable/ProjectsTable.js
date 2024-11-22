import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectsTable = () => {
  // Sample project data
  const [projects] = useState([
    { id: 1, creator: "Alice", investments: 5000, date: "2023-11-01" },
    { id: 2, creator: "Bob", investments: 3000, date: "2023-10-25" },
    { id: 3, creator: "Charlie", investments: 8000, date: "2023-09-15" },
    { id: 4, creator: "David", investments: 2000, date: "2023-11-10" },
  ]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler to view project details
  const handleView = (project) => {
    alert(`Viewing details for project created by ${project.creator}`);
  };

  // Handler to delete a project
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      alert(`Project with ID ${id} deleted.`);
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
            <th>Creator</th>
            <th>Total Investment Collected</th>
            <th>Date of Creation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.creator}</td>
                <td>${project.investments.toLocaleString()}</td>
                <td>{project.date}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleView(project)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(project.id)}
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

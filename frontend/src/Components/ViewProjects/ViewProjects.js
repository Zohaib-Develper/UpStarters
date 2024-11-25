import React from "react";
import "./ViewProjects.css";
const ViewProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Project A",
      imageUrl: "https://example.com/project-a.jpg",
      fundsRequired: 5000,
      fundsCollected: 2500,
      category: "Technology",
      date:"12 Dec,2023",
    },
    {
      id: 2,
      title: "Project B",
      imageUrl: "https://example.com/project-b.jpg",
      fundsRequired: 10000,
      fundsCollected: 7000,
      category: "Art",
      date:"12 Dec,2023",
    },
  ];
  return (
    <div className="view-project-container">
      <h3 className="text-center my-4">View Projects</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Funds Required</th>
            <th>Funds Collected</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-table-image"
                />
              </td>
              <td>{project.title}</td>
              <td>{project.fundsRequired} Rs</td>
              <td>{project.fundsCollected} Rs</td>
              <td>{project.category}</td>
              <td>{project.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProjects;

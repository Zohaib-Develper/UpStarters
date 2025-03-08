import React, { useEffect, useState } from "react";
import "./ViewProjects.css";
import axios from "axios";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/projects/userprojects`, {
        withCredentials: true,
      })
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);
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
                  src={project.image}
                  alt={project.title}
                  className="project-table-image"
                />
              </td>
              <td>{project.title}</td>
              <td>{project.investmentGoal} Rs</td>
              <td>{project.fundsRaised} Rs</td>
              <td>{project.category}</td>
              <td>{new Date(project.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProjects;

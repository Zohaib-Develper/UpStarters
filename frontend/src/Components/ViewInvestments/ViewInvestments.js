import React from "react";
const ViewInvestments = () => {
  const investments = [
    {
      id: 1,
      title: "Project A",
      imageUrl: "https://example.com/project-a.jpg",
      fundsRequired: 5000,
      fundsCollected: 2500,
      category: "Technology",
      moneyInvested: 200,
    },
    {
      id: 2,
      title: "Project B",
      imageUrl: "https://example.com/project-b.jpg",
      fundsRequired: 10000,
      fundsCollected: 7000,
      category: "Art",
      moneyInvested: 200,
    },
  ];
  return (
    <div className="view-project-container">
      <h3 className="text-center my-4">View Investments</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Funds Required</th>
            <th>Funds Collected</th>
            <th>Category</th>
            <th>Your Investments</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((project) => (
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
              <td>{project.moneyInvested} Rs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInvestments;

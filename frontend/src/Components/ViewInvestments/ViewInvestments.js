import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewInvestments = () => {
  const [investments, setInvestments] = useState([]);

  console.log(investments);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/users/investments`, {
        withCredentials: true,
      })
      .then((response) => setInvestments(response.data.data.investments))
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);
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
          {investments.map((investment) => (
            <tr key={investment.id}>
              <td>
                <img
                  src={investment.project?.image}
                  alt={investment?.title}
                  className="project-table-image"
                />
              </td>
              <td>{investment.project?.title}</td>
              <td>
                {investment.project?.investmentGoal -
                  investment.project?.fundsRaised}{" "}
                Rs
              </td>
              <td>{investment.project?.fundsRaised} Rs</td>
              <td>{investment.project?.category}</td>
              <td>{investment.amount} Rs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInvestments;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersTable = () => {
  // Sample user data
  const [users] = useState([
    { id: 1, name: "Alice", projects: 5, investments: 10 },
    { id: 2, name: "Bob", projects: 3, investments: 7 },
    { id: 3, name: "Charlie", projects: 8, investments: 15 },
    { id: 4, name: "David", projects: 2, investments: 5 },
  ]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler to view user details
  const handleView = (user) => {
    alert(`Viewing details for ${user.name}`);
  };

  // Handler to delete a user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      alert(`User with ID ${id} deleted.`);
    }
  };

  return (
    <div className="container mt-1">
      <h3 className="mb-2">Users</h3>

      {/* Search Input */}
      <div className="mb-3  d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name..."
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
            <th>Name</th>
            <th>No. of Projects</th>
            <th>No. of Investments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.projects}</td>
                <td>{user.investments}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

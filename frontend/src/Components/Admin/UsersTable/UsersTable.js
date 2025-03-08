import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/admin/users`, { withCredentials: true })
      .then((res) => setUsers(res.data.users));
  }, []);

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
      axios
        .delete(`${process.env.REACT_APP_BACKENDURL}/api/admin/users/${id}`, {
          withCredentials: true,
        })
        .then(() => setUsers(users.filter((user) => user._id != id)));

      alert(`User with ID ${id} deleted.`);
    }
  };

  return (
    <div className="container mt-1 ">
      <h3 className="mb-2">Users</h3>

      {/* Search Input */}
      <div className="mb-3  d-flex justify-content-center align-items-center ">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <table
          className=" table-striped w-100"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>No. of Projects</th>
              <th>No. of Investments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td> <td>{user.email}</td>
                  <td>{user.noOfProjects}</td>
                  <td>{user.noOfInvestments}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default UsersTable;

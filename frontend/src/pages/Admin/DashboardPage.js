import StatsCard from "../../Components/Admin/StatsCard/StatsCard";
import Charts from "../../Components/Admin/Charts/Charts";
import { FaUsers, FaBox } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/admin/stats`, { withCredentials: true })
      .then((res) =>
        setStats({
          noOfProjects: res.data.noOfUsers,
          noOfUsers: res.data.noOfProjects,
        })
      );
  }, []);
  return (
    <>
      <h3 className="fw-bold ps-3">Dashboard</h3>
      <div
        className="d-flex justify-content-between gap-3 mb-3 stats-cards  abs px-3 "
        style={{ height: "28%", border: "none" }}
      >
        <StatsCard
          title="Total Users"
          value={stats.noOfUsers}
          icon={<FaUsers size={120} />}
          bgColor="#4bc0c0"
        />
        <StatsCard
          title="Total Projects"
          value={stats.noOfProjects}
          icon={<FaBox size={120} />}
          bgColor="#ffce56"
        />
      </div>

      <Charts />
    </>
  );
};

export default DashboardPage;

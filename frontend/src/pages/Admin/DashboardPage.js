import StatsCard from "../../Components/Admin/StatsCard/StatsCard";
import Charts from "../../Components/Admin/Charts/Charts";
import { FaUsers, FaBox } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <>
      <h3 className="fw-bold ps-3">Dashboard</h3>
      <div
        className="d-flex justify-content-between gap-3 mb-3 stats-cards  abs px-3 "
        style={{ height: "28%", border: "none" }}
      >
        <StatsCard
          title="Total Users"
          value="40,689"
          icon={<FaUsers size={120} />}
          bgColor="#4bc0c0"
        />
        <StatsCard
          title="Total Projects"
          value="10,293"
          icon={<FaBox size={120} />}
          bgColor="#ffce56"
        />
      </div>

      <Charts />
    </>
  );
};

export default DashboardPage;

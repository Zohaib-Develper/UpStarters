import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "./Charts.css";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Monthly New User Growth",
        data: [300, 600, 400, 200, 500, 700, 600, 400, 300, 500],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["12:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
    datasets: [
      {
        label: "Daily Visitor",
        data: [1000, 2000, 3000, 4000, 3500, 4500, 4000],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <div className="charts d-flex justify-content-between gap-3 mb-3 stats-cards  abs px-3">
      <div className="chart">
        <h5>Monthly New User Growth</h5>
        <Bar data={barData} />
      </div>
      <div className="chart">
        <h5>Daily Visitor</h5>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;

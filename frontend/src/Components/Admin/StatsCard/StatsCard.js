import React from "react";
import "./StatsCard.css";

const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className="stats-card w-100 h-100"
      style={{
        backgroundColor: bgColor,
        paddingLeft: "40px",
        paddingRight: "80px",
      }}
    >
      <div className="stats-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
      <div className="stats-icon">{icon}</div>
    </div>
  );
};

export default StatsCard;

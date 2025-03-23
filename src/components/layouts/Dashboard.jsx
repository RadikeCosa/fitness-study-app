// src/components/layout/Dashboard.jsx
import React from "react";
import ExerciseLog from "../exercise/ExerciseLog";
import StatsDisplay from "../stats/StatsDisplay";
import Quotes from "../Quotes";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard" aria-label="Panel de entrenamiento">
      <div className="dashboard-container">
        <ExerciseLog />
        <StatsDisplay />
      </div>
      <Quotes />
    </section>
  );
}

export default Dashboard;

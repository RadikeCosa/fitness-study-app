// src/components/Dashboard.jsx
import React from "react";
import ExerciseLog from "./ExerciseLog";
import StatsDisplay from "./StatsDisplay";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard" aria-label="Panel de entrenamiento">
      <div className="dashboard-container">
        <ExerciseLog />
        <StatsDisplay />
      </div>
    </section>
  );
}

export default Dashboard;

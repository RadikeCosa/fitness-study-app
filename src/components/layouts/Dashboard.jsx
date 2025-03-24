// src/components/layout/Dashboard.jsx
import React from "react";
import ExerciseLog from "../exercise/ExerciseLog";
import StatsChart from "../stats/StatsChart";
import StatsCards from "../stats/StatsCards";
import Quotes from "../Quotes";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Dashboard.css";

function Dashboard() {
  const [logs] = useLocalStorage("exerciseLogs", {});

  return (
    <div className="dashboard-grid">
      <header className="dashboard-header">
        <h1>Fitness & Study</h1>
      </header>
      <aside className="dashboard-sidebar-left">
        <ExerciseLog />
      </aside>
      <main className="dashboard-main">
        <StatsChart logs={logs} />
      </main>
      <aside className="dashboard-sidebar-right">
        <StatsCards logs={logs} />
      </aside>
      <footer className="dashboard-footer">
        <Quotes />
      </footer>
    </div>
  );
}

export default Dashboard;

// src/components/layout/Dashboard.jsx
import React from "react";
import ExerciseLog from "../exercise/ExerciseLog";
import StatsChart from "../stats/StatsChart";
import StatsCards from "../stats/StatsCards";
import Quotes from "../Quotes";
import DateDisplay from "../../ui/dateDisplay";
import TimeDisplay from "../../ui/TimeDisplay";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Dashboard.css";
import MainTitle from "../../ui/MainTitle";

function Dashboard() {
  const [logs] = useLocalStorage("exerciseLogs", {});

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Argestan</h1>
        <div className="datetime">
          <DateDisplay />
          <TimeDisplay />
        </div>
      </header>
      <div className="dashboard-content">
        <section className="dashboard-exercise">
          <ExerciseLog />
        </section>
        <section className="dashboard-chart">
          <StatsChart logs={logs} />
        </section>
        <section className="dashboard-cards">
          <StatsCards logs={logs} />
        </section>
        <section className="dashboard-quotes">
          <Quotes />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

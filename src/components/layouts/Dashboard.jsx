// src/components/layout/Dashboard.jsx
import React from "react";
import ExerciseLog from "../exercise/ExerciseLog";
import StatsChart from "../stats/StatsChart";
import StatsCards from "../stats/StatsCards";
import Quotes from "../Quotes";
import DateDisplay from "../../ui/DateDisplay"; // Path corregido
import TimeDisplay from "../../ui/TimeDisplay"; // Path corregido
import useLocalStorage from "../../hooks/useLocalStorage";
import MainTitle from "../../ui/MainTitle";
import ManualLog from "../exercise/ManualLog";
import "./Dashboard.css";

function Dashboard() {
  const [logs] = useLocalStorage("exerciseLogs", {});

  return (
    <div className="dashboard">
      <header className="title-time-date">
        <MainTitle name="Argestan" />
        <DateDisplay />
        <TimeDisplay />
      </header>
      <div className="quotes-container">
        <Quotes />
      </div>
      <section className="manual-log-container">
        <ManualLog
          onSave={(date, minutes) => {
            const logs = JSON.parse(
              localStorage.getItem("exerciseLogs") || "{}"
            );
            logs[date] = (logs[date] || 0) + minutes;
            localStorage.setItem("exerciseLogs", JSON.stringify(logs));
          }}
        />
      </section>
    </div>
  );
}

export default Dashboard;

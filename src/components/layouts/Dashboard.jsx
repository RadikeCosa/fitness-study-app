// src/components/layout/Dashboard.jsx
import React from "react";
import Quotes from "../Quotes";
import DateDisplay from "../../ui/DateDisplay"; // Path corregido
import TimeDisplay from "../../ui/TimeDisplay"; // Path corregido
import useLocalStorage from "../../hooks/useLocalStorage";
import MainTitle from "../../ui/MainTitle";
import ManualLog from "../exercise/ManualLog";
import StatsChart from "../stats/StatsChart"; // Path corregido
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
      <ManualLog />
      <StatsChart logs={logs} />
    </div>
  );
}

export default Dashboard;

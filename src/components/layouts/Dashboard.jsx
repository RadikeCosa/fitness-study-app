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
      <header className="title-time-date">
        <MainTitle name="Argestan" />
        <DateDisplay />
        <TimeDisplay />
      </header>
      <div className="quotes-container">
        <Quotes />
      </div>
    </div>
  );
}

export default Dashboard;

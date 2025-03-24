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
    <div>
      <MainTitle>Argestan </MainTitle>
      <DateDisplay />
      <TimeDisplay />
      <ExerciseLog />
      <StatsChart logs={logs} />
      <StatsCards logs={logs} />
      <Quotes />
    </div>
  );
}

export default Dashboard;

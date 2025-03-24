// src/components/layout/Dashboard.jsx
import React from "react";
import Quotes from "../Quotes";
import DateDisplay from "../../ui/DateDisplay"; // Path corregido
import TimeDisplay from "../../ui/TimeDisplay"; // Path corregido
import useLocalStorage from "../../hooks/useLocalStorage";
import MainTitle from "../../ui/MainTitle";
import ManualLog from "../exercise/ManualLog";
import StatsChart from "../stats/StatsChart"; // Path corregido
import Stopwatch from "../exercise/Stopwatch";
import "./Dashboard.css";

function Dashboard() {
  const [logs, setLogs] = useLocalStorage("exerciseLogs", {});

  const saveLog = (date, minutes) => {
    console.log("Dashboard - saveLog recibido:", { date, minutes });
    const updatedLogs = { ...logs, [date]: (logs[date] || 0) + minutes };
    console.log("Dashboard - Logs actualizados:", updatedLogs);
    setLogs(updatedLogs);
  };

  const resetLogs = () => {
    setLogs({});
  };

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
        <MainTitle name="Cargar Entrenamiento" />
        <ManualLog saveLog={saveLog} />
      </section>
      <section className="stats-chart-container">
        <StatsChart logs={logs} resetLogs={resetLogs} />
      </section>
      <section className="stopwatch-container">
        <Stopwatch saveLog={saveLog} />
      </section>
    </div>
  );
}

export default Dashboard;

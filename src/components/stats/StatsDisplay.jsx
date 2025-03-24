// src/components/stats/StatsDisplay.jsx
import React from "react";
import StatsChart from "./StatsChart";
import StatsCards from "./StatsCards";
import useLocalStorage from "../../hooks/useLocalStorage";
import SectionTitle from "../../ui/SectionTitle";
import "./StatsDisplay.css";

function StatsDisplay() {
  const [logs] = useLocalStorage("exerciseLogs", {});

  return (
    <article
      className="stats-display"
      aria-label="Estadísticas de entrenamiento"
    >
      <SectionTitle>Estadísticas</SectionTitle>
      <StatsChart logs={logs} />
      <StatsCards logs={logs} />
    </article>
  );
}

export default StatsDisplay;

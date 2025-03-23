// src/components/StatsDisplay.jsx
import React, { useState, useEffect } from "react";
import "./StatsDisplay.css";

function StatsDisplay() {
  const [logs, setLogs] = useState({});

  useEffect(() => {
    const updateLogs = () => {
      setLogs(JSON.parse(localStorage.getItem("exerciseLogs") || "{}"));
    };
    updateLogs();
    window.addEventListener("storage", updateLogs); // Escucha cambios
    return () => window.removeEventListener("storage", updateLogs);
  }, []);

  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      days.push({ date: key, minutes: logs[key] || 0 });
    }
    return days;
  };

  const totalMinutes = Object.values(logs).reduce((sum, min) => sum + min, 0);
  const averageMinutes = totalMinutes / 7 || 0;

  return (
    <article
      className="stats-display"
      aria-label="Estadísticas de entrenamiento"
    >
      <h2>Estadísticas</h2>
      <ul>
        {getLast7Days().map(({ date, minutes }) => (
          <li key={date}>
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
              })}
            </time>
            : {minutes} min
          </li>
        ))}
      </ul>
      <p>Total semanal: {totalMinutes} min</p>
      <p>Promedio diario: {averageMinutes.toFixed(1)} min</p>
    </article>
  );
}

export default StatsDisplay;

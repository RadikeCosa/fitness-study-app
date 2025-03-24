// src/components/stats/StatsCards.jsx
import React from "react";
import "./StatsCards.css";

function StatsCards({ logs = {} }) {
  // Valor por defecto para logs
  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      days.push({ date: key, minutes: logs[key] || 0 });
    }
    return days.reverse();
  };

  const data = getLast7Days();
  const totalMinutes = data.reduce((sum, { minutes }) => sum + minutes, 0);
  const averageMinutes = totalMinutes / 7 || 0;
  const maxDay = data.reduce(
    (max, curr) => (curr.minutes > max.minutes ? curr : max),
    data[0]
  );
  const minDay = data.reduce(
    (min, curr) => (curr.minutes < min.minutes ? curr : min),
    data[0]
  );
  const trend =
    totalMinutes > averageMinutes * 7 ? "positiva" : "negativa o estable";

  return (
    <section className="stats-cards" aria-label="Estadísticas de entrenamiento">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{totalMinutes}</span>
          <span className="stat-label">Total semanal (min)</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{averageMinutes.toFixed(1)}</span>
          <span className="stat-label">Promedio diario (min)</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {maxDay.minutes > 0
              ? `${new Date(maxDay.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                })} (${maxDay.minutes})`
              : "Ninguno"}
          </span>
          <span className="stat-label">Día más activo</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            {minDay.minutes > 0
              ? `${new Date(minDay.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                })} (${minDay.minutes})`
              : "Ninguno"}
          </span>
          <span className="stat-label">Día menos activo</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{trend}</span>
          <span className="stat-label">Tendencia</span>
        </div>
      </div>
    </section>
  );
}

export default StatsCards;

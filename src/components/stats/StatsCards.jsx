// src/components/stats/StatsCards.jsx
import React from "react";
import { useExerciseStats } from "../../hooks/useExerciseStats";
import "./StatsCards.css";

function StatCard({ value, label }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function StatsCards({ logs = {} }) {
  const { data, totalMinutes, averageMinutes, maxDay, minDay, trend } =
    useExerciseStats(logs);

  // Formatear fechas
  const formatDate = (dateStr) => {
    if (!dateStr) return "Ninguno";
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  // Días activos y racha
  const activeDaysCount = data.filter((d) => d.minutes > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].minutes > 0) streak++;
      else break;
    }
    return streak;
  })();

  // Estadísticas simplificadas
  const stats = [
    { value: totalMinutes, label: "Total semanal (min)" },
    { value: averageMinutes.toFixed(1), label: "Promedio diario (min)" },
    {
      value:
        maxDay.minutes > 0
          ? `${formatDate(maxDay.date)} (${maxDay.minutes})`
          : "Ninguno",
      label: "Día más activo",
    },
    {
      value:
        minDay.minutes > 0
          ? `${formatDate(minDay.date)} (${minDay.minutes})`
          : "Ninguno",
      label: "Día menos activo",
    },
    { value: trend, label: "Tendencia" },
    { value: activeDaysCount, label: "Días activos (de 7)" },
    { value: currentStreak, label: "Racha actual (días)" },
  ];

  return (
    <section className="stats-cards" aria-label="Estadísticas de entrenamiento">
      {stats.length === 0 ? (
        <p className="no-data">No hay datos disponibles</p>
      ) : (
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}
    </section>
  );
}

export default StatsCards;

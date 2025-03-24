// src/components/stats/StatsCards.jsx
import React from "react";
import { useExerciseStats } from "../../hooks/useExerciseStats";
import SectionTitle from "../../ui/SectionTitle";
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
  const { totalMinutes, averageMinutes, maxDay, minDay, trend } =
    useExerciseStats(logs);

  const stats = [
    { value: totalMinutes, label: "Total semanal (min)" },
    { value: averageMinutes.toFixed(1), label: "Promedio diario (min)" },
    {
      value:
        maxDay.minutes > 0
          ? `${new Date(maxDay.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            })} (${maxDay.minutes})`
          : "Ninguno",
      label: "Día más activo",
    },
    {
      value:
        minDay.minutes > 0
          ? `${new Date(minDay.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            })} (${minDay.minutes})`
          : "Ninguno",
      label: "Día menos activo",
    },
    { value: trend, label: "Tendencia" },
  ];

  return (
    <section className="stats-cards" aria-label="Estadísticas de entrenamiento">
      <SectionTitle>Estadísticas</SectionTitle>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

export default StatsCards;

// src/components/stats/StatsCards.jsx
import React from "react";
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
  const activeDays = data.filter((d) => d.minutes > 0);
  const maxDay = activeDays.length
    ? activeDays.reduce((max, curr) =>
        curr.minutes > max.minutes ? curr : max
      )
    : { date: "", minutes: 0 };
  const minDay = activeDays.length
    ? activeDays.reduce((min, curr) =>
        curr.minutes < min.minutes ? curr : min
      )
    : { date: "", minutes: 0 };
  const trend =
    totalMinutes > averageMinutes * 7 ? "positiva" : "negativa o estable";

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
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

export default StatsCards;

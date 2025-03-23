// src/components/StatsDisplay.jsx
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./StatsDisplay.css";

function StatsDisplay() {
  const [logs, setLogs] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const updateLogs = () => {
      setLogs(JSON.parse(localStorage.getItem("exerciseLogs") || "{}"));
    };
    updateLogs();
    window.addEventListener("storage", updateLogs);
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

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 320 - margin.left - margin.right;
    const height = 160 - margin.top - margin.bottom;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.1);
    const y = d3
      .scaleLinear()
      .domain([
        0,
        Math.max(
          100,
          d3.max(data, (d) => d.minutes)
        ),
      ])
      .range([height, 0]);

    // Ejes
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) =>
            new Date(d).toLocaleDateString("es-ES", {
              weekday: "short",
              day: "numeric",
            })
          )
      );

    svg
      .append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d}`)
      );

    // Línea
    const line = d3
      .line()
      .x((d) => x(d.date) + x.bandwidth() / 2)
      .y((d) => y(d.minutes))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Puntos
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.minutes))
      .attr("r", 3)
      .attr("fill", "#000");

    // Leyenda
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("class", "legend")
      .text("Ejercicio diario (min)");
  }, [logs, data]);

  return (
    <article
      className="stats-display"
      aria-label="Estadísticas de entrenamiento"
    >
      <h2>Estadísticas</h2>
      <div className="stats-container">
        <section
          className="stats-chart"
          aria-label="Gráfico de entrenamientos diarios"
        >
          <svg ref={chartRef}></svg>
        </section>
        <section className="stats-values">
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
      </div>
    </article>
  );
}

export default StatsDisplay;

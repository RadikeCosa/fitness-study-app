// src/components/stats/StatsChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useExerciseStats } from "../../hooks/useExerciseStats";
import "./StatsChart.css";

function StatsChart({ logs = {}, resetLogs }) {
  const chartRef = useRef(null);
  const { data } = useExerciseStats(logs);

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 320 - margin.left - margin.right;
    const height = 160 - margin.top - margin.bottom;

    // Limpiar el SVG antes de renderizar
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escala X: Usar las fechas exactas de 'data'
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.1);

    // Escala Y: Igual que antes
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

    // Eje X: Mostrar días de la semana correctamente alineados
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          const date = new Date(d);
          // Ajustar por zona horaria para que coincida con la fecha ISO
          date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          return date.toLocaleDateString("es-ES", { weekday: "short" });
        })
      );

    // Eje Y: Sin cambios
    svg
      .append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d}`)
      );

    // Línea: Sin cambios
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

    // Puntos: Sin cambios
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

    // Leyenda: Sin cambios
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("class", "legend")
      .text("Ejercicio diario (min)");
  }, [data]);

  return (
    <section
      className="stats-chart"
      aria-label="Gráfico de entrenamientos diarios"
    >
      <svg ref={chartRef}></svg>
      <button
        type="button"
        onClick={resetLogs}
        aria-label="Reiniciar datos de entrenamientos"
      >
        Reiniciar Datos
      </button>
    </section>
  );
}

export default StatsChart;

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

    // Dimensiones
    const container = chartRef.current.parentElement;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight * 0.8 - margin.top - margin.bottom;

    // Limpiar y configurar SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .html("")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([0, width]); // Primer punto en 0, último en width

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
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          const date = new Date(d);
          date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          return date.toLocaleDateString("es-ES", { weekday: "short" });
        })
      );

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y).ticks(5));

    // Línea
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.minutes))
      .curve(d3.curveMonotoneX);

    svg.append("path").datum(data).attr("class", "line").attr("d", line);

    // Puntos
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.minutes))
      .attr("r", 4);
  }, [data]);

  return (
    <section
      className="stats-chart"
      aria-label="Gráfico de entrenamientos diarios"
    >
      <svg ref={chartRef}></svg>
      <button type="button" onClick={resetLogs}>
        Reiniciar Datos
      </button>
    </section>
  );
}

export default StatsChart;

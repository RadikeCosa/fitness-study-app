// src/components/stats/StatsChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useExerciseStats } from "../../hooks/useExerciseStats";
import "./StatsChart.css";
import SectionTitle from "../../ui/SectionTitle";

function StatsChart({ logs = {} }) {
  const chartRef = useRef(null);
  const { data } = useExerciseStats(logs);

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

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d) =>
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
      <SectionTitle>Gráfico de Entrenamientos Diarios</SectionTitle>
      <svg ref={chartRef}></svg>
    </section>
  );
}

export default StatsChart;

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

    // Dimensiones dinámicas
    const container = chartRef.current.parentElement;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 }; // Más espacio en bottom para evitar superposición
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight * 0.8 - margin.top - margin.bottom; // 80% del espacio para el gráfico

    // Limpiar SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .html("")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.2); // Más padding para aire entre barras

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

    svg
      .append("g")
      .attr("class", "y-axis")
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

    svg.append("path").datum(data).attr("class", "line").attr("d", line);

    // Puntos
    const dots = svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.minutes))
      .attr("r", 4);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    dots
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `${d.minutes} min<br>${new Date(d.date).toLocaleDateString(
              "es-ES"
            )}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Leyenda fuera del eje X
    svg
      .append("text")
      .attr("class", "legend")
      .attr("x", width / 2)
      .attr("y", -10) // Movida arriba del gráfico
      .text("Ejercicio diario (min)");

    return () => {
      tooltip.remove();
    };
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

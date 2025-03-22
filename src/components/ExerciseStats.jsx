// src/components/ExerciseStats.jsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./ExerciseStats.css";
import useExerciseTime from "../hooks/useExerciseTime";

function ExerciseStats() {
  const svgRef = useRef();
  const { totalWeeklyTime } = useExerciseTime(); // Forzar re-renderizado

  useEffect(() => {
    // Datos de los últimos 7 días desde localStorage
    const now = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const key = `exercise_${date.toDateString()}`;
      const time = parseInt(localStorage.getItem(key) || "0", 10);
      data.push({
        date: date.toLocaleDateString("es-ES", { weekday: "short" }),
        time: Math.floor(time / 60), // Minutos enteros
      });
    }

    // Configuración del gráfico
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Limpiar SVG previo
    d3.select(svgRef.current).selectAll("*").remove();

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([0, width]);

    const maxTime = Math.max(d3.max(data, (d) => d.time) || 1, 5); // Mínimo 5 para visibilidad
    const y = d3.scaleLinear().domain([0, maxTime]).range([height, 0]).nice();

    // Ejes
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "var(--off-white)");

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(y)
          .tickValues(d3.range(0, maxTime + 1, Math.ceil(maxTime / 5)))
          .tickFormat(d3.format("d"))
      )
      .selectAll("text")
      .style("fill", "var(--off-white)");

    // Etiqueta del eje Y
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "var(--off-white)")
      .text("Minutos");

    // Línea
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.time))
      .curve(d3.curveMonotoneX); // Suaviza la línea

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "var(--olive-green)")
      .attr("stroke-width", 2);

    // Puntos en la línea
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.time))
      .attr("r", 4)
      .attr("fill", "var(--olive-green)")
      .append("title")
      .text((d) => `${d.date}: ${d.time} minutos`);

    // Título
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("fill", "var(--off-white)")
      .text("Ejercicio Últimos 7 Días");
  }, [totalWeeklyTime]);

  return (
    <section className="exercise-stats" aria-label="Estadísticas de ejercicio">
      <h2 className="visually-hidden">Estadísticas de Ejercicio</h2>
      <svg ref={svgRef} aria-hidden="true" />
    </section>
  );
}

export default ExerciseStats;

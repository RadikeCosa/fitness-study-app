import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Charts({ exerciseTime, studyTime }) {
  const dailyRef = useRef();
  const todayRef = useRef();

  useEffect(() => {
    const dailyExercise =
      JSON.parse(localStorage.getItem("dailyExercise")) || {};
    const dailyStudy = JSON.parse(localStorage.getItem("dailyStudy")) || {};
    const today = new Date().toISOString().split("T")[0];

    // Historial de los últimos 7 días
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const dailyData = days.map((day) => ({
      day,
      exercise: (dailyExercise[day] || 0) / 3600, // Convertir a horas
      study: (dailyStudy[day] || 0) / 3600,
    }));

    // Datos del día actual
    const todayData = [
      { label: "Ejercicio", value: (dailyExercise[today] || 0) / 3600 },
      { label: "Estudio", value: (dailyStudy[today] || 0) / 3600 },
    ];

    // Gráfico de historial diario
    const dailySvg = d3.select(dailyRef.current);
    dailySvg.selectAll("*").remove();
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(days)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dailyData, (d) => Math.max(d.exercise, d.study)) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    dailySvg.attr("width", width).attr("height", height);

    dailySvg
      .selectAll(".exercise-bar")
      .data(dailyData)
      .enter()
      .append("rect")
      .attr("class", "exercise-bar")
      .attr("x", (d) => x(d.day))
      .attr("y", (d) => y(d.exercise))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - y(d.exercise))
      .attr("fill", "steelblue");

    dailySvg
      .selectAll(".study-bar")
      .data(dailyData)
      .enter()
      .append("rect")
      .attr("class", "study-bar")
      .attr("x", (d) => x(d.day) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.study))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - margin.bottom - y(d.study))
      .attr("fill", "orange");

    dailySvg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) =>
            new Date(d).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            })
          )
      );

    dailySvg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

    // Gráfico del día actual
    const todaySvg = d3.select(todayRef.current);
    todaySvg.selectAll("*").remove();

    const tx = d3
      .scaleBand()
      .domain(todayData.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const ty = d3
      .scaleLinear()
      .domain([0, d3.max(todayData, (d) => d.value) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    todaySvg.attr("width", width).attr("height", height);

    todaySvg
      .selectAll(".bar")
      .data(todayData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => tx(d.label))
      .attr("y", (d) => ty(d.value))
      .attr("width", tx.bandwidth())
      .attr("height", (d) => height - margin.bottom - ty(d.value))
      .attr("fill", (d) => (d.label === "Ejercicio" ? "steelblue" : "orange"));

    todaySvg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(tx));

    todaySvg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(ty).ticks(5));
  }, [exerciseTime, studyTime]);

  return (
    <section aria-labelledby="charts-title">
      <h2 id="charts-title">Tiempo acumulado (horas)</h2>
      <h3>Últimos 7 días</h3>
      <svg ref={dailyRef}></svg>
      <h3>Hoy</h3>
      <svg ref={todayRef}></svg>
    </section>
  );
}

export default Charts;

// src/components/ExerciseLog.jsx
import React, { useState, useEffect } from "react";
import "./ExerciseLog.css";

function ExerciseLog() {
  const [time, setTime] = useState(0); // Segundos totales del cronómetro
  const [isRunning, setIsRunning] = useState(false);
  const [manualDate, setManualDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [manualMinutes, setManualMinutes] = useState(0); // Valor inicial del slider

  // Cronómetro
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Opciones de fechas (hoy y 7 días atrás)
  const getDateOptions = () => {
    const options = [];
    for (let i = 0; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const value = date.toISOString().split("T")[0];
      options.push(
        <option key={value} value={value}>
          {date.toLocaleDateString("es-ES", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </option>
      );
    }
    return options;
  };

  // Formatear tiempo del cronómetro
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Guardar cronómetro en localStorage
  const saveTime = () => {
    const logs = JSON.parse(localStorage.getItem("exerciseLogs") || "{}");
    const today = new Date().toISOString().split("T")[0];
    logs[today] = (logs[today] || 0) + Math.floor(time / 60);
    localStorage.setItem("exerciseLogs", JSON.stringify(logs));
    setTime(0);
    setIsRunning(false);
  };

  // Guardar registro manual
  const saveManual = (e) => {
    e.preventDefault();
    if (manualMinutes <= 0) return; // Evita guardar 0
    const logs = JSON.parse(localStorage.getItem("exerciseLogs") || "{}");
    logs[manualDate] = (logs[manualDate] || 0) + parseInt(manualMinutes);
    localStorage.setItem("exerciseLogs", JSON.stringify(logs));
    setManualMinutes(0); // Resetea el slider
  };

  return (
    <article className="exercise-log" aria-label="Registro de ejercicio">
      <h2>Registro de Entrenamiento</h2>

      {/* Cronómetro */}
      <section className="stopwatch">
        <output aria-live="polite">{formatTime(time)}</output>
        <div className="stopwatch-controls">
          <button
            onClick={() => setIsRunning(!isRunning)}
            aria-label={isRunning ? "Pausar cronómetro" : "Iniciar cronómetro"}
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </button>
          <button
            onClick={() => setTime(0)}
            disabled={isRunning}
            aria-label="Reiniciar cronómetro"
          >
            Reiniciar
          </button>
          <button
            onClick={saveTime}
            disabled={time === 0}
            aria-label="Guardar tiempo"
          >
            Guardar
          </button>
          <button
            onClick={() => setTime(0)}
            disabled={time === 0}
            aria-label="Cancelar cronómetro"
          >
            Cancelar
          </button>
        </div>
      </section>

      {/* Registro manual con slider */}
      <form className="manual-log" onSubmit={saveManual}>
        <label htmlFor="manual-date">Fecha:</label>
        <select
          id="manual-date"
          value={manualDate}
          onChange={(e) => setManualDate(e.target.value)}
        >
          {getDateOptions()}
        </select>
        <label htmlFor="manual-minutes">
          Minutos: <span>{manualMinutes}</span>
        </label>
        <input
          id="manual-minutes"
          type="range"
          min="0"
          max="100"
          value={manualMinutes}
          onChange={(e) => setManualMinutes(e.target.value)}
          aria-label={`Seleccionar ${manualMinutes} minutos de ejercicio`}
        />
        <button type="submit" aria-label="Guardar registro manual">
          Guardar
        </button>
      </form>
    </article>
  );
}

export default ExerciseLog;

// src/components/exercise/ExerciseLog.jsx
import React from "react";
import Stopwatch from "./Stopwatch";
import ManualLog from "./ManualLog";
import "./ExerciseLog.css";

function ExerciseLog() {
  const handleSave = (date, minutes) => {
    const logs = JSON.parse(localStorage.getItem("exerciseLogs") || "{}");
    logs[date] = (logs[date] || 0) + minutes;
    localStorage.setItem("exerciseLogs", JSON.stringify(logs));
    console.log("Guardado:", { date, minutes, logs });
  };

  return (
    <article className="exercise-log" aria-label="Registro de ejercicio">
      <h2>Registro de Entrenamiento</h2>
      <Stopwatch onSave={handleSave} />
      <ManualLog onSave={handleSave} />
    </article>
  );
}

export default ExerciseLog;

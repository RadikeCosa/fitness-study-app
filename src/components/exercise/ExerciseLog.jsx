// src/components/exercise/ExerciseLog.jsx
import React from "react";
import ManualLog from "./ManualLog";
import Stopwatch from "./Stopwatch";
import SectionTitle from "../../ui/SectionTitle";
import "./ExerciseLog.css";

function ExerciseLog() {
  const handleSave = (date, minutes) => {
    const logs = JSON.parse(localStorage.getItem("exerciseLogs") || "{}");
    logs[date] = (logs[date] || 0) + minutes;
    localStorage.setItem("exerciseLogs", JSON.stringify(logs));
    console.log("Guardado:", { date, minutes, logs });
  };

  return (
    <article className="exercise-log" aria-label="Registro de entrenamiento">
      <SectionTitle>Registro de Entrenamiento</SectionTitle>
      <div className="logSection">
        <ManualLog onSave={handleSave} />
        <Stopwatch onSave={handleSave} />
      </div>
    </article>
  );
}

export default ExerciseLog;

// src/components/exercise/ManualLog.jsx
import React, { useState } from "react";
import useExerciseLogs from "../../hooks/useExerciseLogs";
import "./ManualLog.css";

function ManualLog() {
  const [manualDate, setManualDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [manualMinutes, setManualMinutes] = useState(0);
  const { saveLog } = useExerciseLogs();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const minutes = parseInt(manualMinutes);
    if (minutes <= 0) return;
    saveLog(manualDate, minutes);
    setManualMinutes(0);
  };

  return (
    <form className="manual-log" onSubmit={handleSubmit}>
      <h3>Registro de Actividad Fisica</h3>
      <div className="date-selector">
        <select
          id="manual-date"
          value={manualDate}
          onChange={(e) => setManualDate(e.target.value)}
        >
          {getDateOptions()}
        </select>
      </div>
      <div className="duration-input">
        <label htmlFor="manual-minutes">
          Tiempo (minutos): <span>{manualMinutes}</span>
        </label>
        <input
          id="manual-minutes"
          type="range"
          min="0"
          max="60"
          value={manualMinutes}
          onChange={(e) => setManualMinutes(parseInt(e.target.value))}
          aria-label={`Seleccionar ${manualMinutes} minutos de ejercicio`}
        />
      </div>
      <button type="submit" aria-label="Guardar registro manual">
        Guardar
      </button>
    </form>
  );
}

export default ManualLog;

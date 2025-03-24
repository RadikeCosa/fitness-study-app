// src/components/exercise/ManualLog.jsx
import React, { useState } from "react";
import DateSelector from "./DateSelector";
import useExerciseLogs from "../../hooks/useExerciseLogs";
import "./ManualLog.css";

function ManualLog() {
  const [manualDate, setManualDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [manualMinutes, setManualMinutes] = useState(0);
  const { saveLog } = useExerciseLogs();

  const handleSubmit = (e) => {
    e.preventDefault();
    const minutes = parseInt(manualMinutes);
    if (minutes <= 0) return;
    saveLog(manualDate, minutes);
    setManualMinutes(0);
  };

  return (
    <form className="manual-log" onSubmit={handleSubmit}>
      <DateSelector
        value={manualDate}
        onChange={(e) => setManualDate(e.target.value)}
      />
      <label htmlFor="manual-minutes">
        Minutos: <span>{manualMinutes}</span>
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
      <button type="submit" aria-label="Guardar registro manual">
        Guardar
      </button>
    </form>
  );
}

export default ManualLog;

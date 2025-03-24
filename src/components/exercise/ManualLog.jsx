// src/components/exercise/ManualLog.jsx
import React, { useState } from "react";
import DateSelector from "./DateSelector";
import "./ManualLog.css";

function ManualLog({ onSave }) {
  const [manualDate, setManualDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [manualMinutes, setManualMinutes] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const minutes = parseInt(manualMinutes);
    if (minutes <= 0) return;
    onSave(manualDate, minutes);
    setManualMinutes(0);
  };

  return (
    <form className="manual-log" onSubmit={handleSubmit}>
      <DateSelector
        value={manualDate}
        onChange={(e) => setManualDate(e.target.value)}
      />

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

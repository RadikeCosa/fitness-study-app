// src/components/exercise/Stopwatch.jsx
import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

function Stopwatch({ saveLog }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSave = () => {
    const minutes = Math.floor(time / 60);
    console.log("Stopwatch - Antes de guardar:", { time, minutes });
    if (minutes > 0) {
      const today = new Date().toISOString().split("T")[0];
      console.log("Stopwatch - Llamando saveLog:", { today, minutes });
      saveLog(today, minutes);
    }
    setTime(0);
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <section className="stopwatch" aria-label="Cronómetro de entrenamiento">
      <output className="timer-display" aria-live="polite">
        {formatTime(time)}
      </output>
      <div className="stopwatch-controls">
        <button
          type="button"
          onClick={() => setIsRunning((prev) => !prev)}
          aria-label={isRunning ? "Pausar cronómetro" : "Iniciar cronómetro"}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          type="button"
          onClick={() => setTime(0)}
          disabled={isRunning || time === 0}
          aria-label="Reiniciar cronómetro"
        >
          Reiniciar
        </button>
      </div>
      <div className="stopwatch-controls record">
        <button
          type="button"
          onClick={handleSave}
          disabled={time === 0}
          aria-label="Guardar tiempo registrado"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={time === 0}
          aria-label="Cancelar y reiniciar cronómetro"
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}

export default Stopwatch;

// src/components/exercise/Stopwatch.jsx
import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

function Stopwatch({ onSave }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSave = () => {
    const minutes = Math.floor(time / 60);
    onSave(new Date().toISOString().split("T")[0], minutes);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <section className="stopwatch" aria-label="Cronómetro de entrenamiento">
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
      </div>
      <div className="stopwatch-controls record">
        <button
          onClick={handleSave}
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
  );
}

export default Stopwatch;

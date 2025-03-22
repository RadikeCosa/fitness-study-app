// src/components/ExerciseTimer.jsx
import { useState, useEffect } from "react";
import "./ExerciseTimer.css";
import useExerciseTime from "../hooks/useExerciseTimer";

function ExerciseTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Tiempo en segundos
  const { totalSessionTime, totalDailyTime, totalWeeklyTime, logSessionTime } =
    useExerciseTime();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleStop = () => {
    if (isRunning) setIsRunning(false);
    if (elapsedTime > 0) {
      logSessionTime(elapsedTime); // Registra el tiempo en localStorage
      setElapsedTime(0); // Reinicia el cronómetro
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <section className="exercise-timer" aria-label="Temporizador de ejercicio">
      <h2 className="visually-hidden">Temporizador de Ejercicio</h2>
      <time className="timer-display" dateTime={`PT${elapsedTime}S`}>
        {formatTime(elapsedTime)}
      </time>
      <div className="controls">
        <button
          onClick={handleStartPause}
          aria-label={
            isRunning ? "Pausar temporizador" : "Iniciar temporizador"
          }
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={handleStop}
          disabled={elapsedTime === 0}
          aria-label="Detener y registrar tiempo"
        >
          Detener
        </button>
      </div>
      <dl className="time-stats">
        <dt>Sesión actual:</dt>
        <dd>{formatTime(totalSessionTime)}</dd>
        <dt>Hoy:</dt>
        <dd>{formatTime(totalDailyTime)}</dd>
        <dt>Últimos 7 días:</dt>
        <dd>{formatTime(totalWeeklyTime)}</dd>
      </dl>
    </section>
  );
}

export default ExerciseTimer;

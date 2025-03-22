// src/components/Dashboard.jsx
import { useState } from "react";
import "./Dashboard.css";
import ExerciseTimer from "./ExerciseTimer";
import ExerciseStats from "./ExerciseStats";

function Dashboard() {
  const [showExercise, setShowExercise] = useState(true);

  return (
    <div className="dashboard">
      <div className="timer-area">
        {showExercise ? (
          <ExerciseTimer />
        ) : (
          <div className="placeholder">Área del Temporizador de Estudio</div>
        )}
        <button
          className="switch-timer-btn"
          onClick={() => setShowExercise(!showExercise)}
          aria-label={
            showExercise
              ? "Cambiar a temporizador de estudio"
              : "Cambiar a temporizador de ejercicio"
          }
        >
          {showExercise ? "Ir a Estudiar" : "Ir a Ejercicio"}
        </button>
      </div>
      <div className="stats-area">
        <ExerciseStats />
      </div>
    </div>
  );
}

export default Dashboard;

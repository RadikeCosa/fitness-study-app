// src/components/Dashboard.jsx
import "./Dashboard.css";
import ExerciseTimer from "./ExerciseTimer";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="stats-area">
        <div className="placeholder">Área de Estadísticas</div>
      </div>
      <div className="timer-area">
        <ExerciseTimer />
        <button
          className="switch-timer-btn"
          aria-label="Cambiar temporizador"
          disabled
        >
          Cambiar Temporizador
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

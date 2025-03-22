// src/components/Dashboard.jsx
import "./Dashboard.css";
import ExerciseLog from "./ExerciseLog";
import StatsDisplay from "./StatsDisplay";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="exercise-log-section">
        <ExerciseLog />
      </div>
      <div className="stats-display-section">
        <StatsDisplay />
      </div>
    </div>
  );
}

export default Dashboard;

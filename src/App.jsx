import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";
import Charts from "./components/Charts";

function App() {
  const [showHiit, setShowHiit] = useState(true);
  const [showCharts, setShowCharts] = useState(false); // Estado para Charts
  const [exerciseTime, setExerciseTime] = useState(
    () => parseInt(localStorage.getItem("totalExercise")) || 0
  );
  const [studyTime, setStudyTime] = useState(
    () => parseInt(localStorage.getItem("totalStudy")) || 0
  );

  useEffect(() => {
    setExerciseTime(parseInt(localStorage.getItem("totalExercise")) || 0);
    setStudyTime(parseInt(localStorage.getItem("totalStudy")) || 0);
  }, []);

  return (
    <div className="app-container">
      <header>
        <Header />
        <h1>Argestan</h1>
      </header>
      <main>
        <div className="controls">
          <button
            className="timer-switch"
            onClick={() => setShowHiit(!showHiit)}
            aria-label={
              showHiit
                ? "Cambiar al temporizador de estudio (Pomodoro)"
                : "Cambiar al temporizador de ejercicio (HIIT)"
            }
          >
            {showHiit ? "Ir a Estudiar" : "Ir a Ejercicio"}
          </button>
          <button
            className="charts-toggle"
            onClick={() => setShowCharts(!showCharts)}
            aria-label={showCharts ? "Ocultar totales" : "Ver totales"}
          >
            {showCharts ? "Ocultar totales" : "Ver totales"}
          </button>
        </div>
        {showHiit ? (
          <HiitTimer onTimeUpdate={setExerciseTime} />
        ) : (
          <Pomodoro onTimeUpdate={setStudyTime} />
        )}
        {showCharts && (
          <Charts exerciseTime={exerciseTime} studyTime={studyTime} />
        )}
        <Quotes />
      </main>
    </div>
  );
}

export default App;

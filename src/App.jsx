import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";
import Charts from "./components/Charts";

function App() {
  const [showHiit, setShowHiit] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
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
    <>
      <header>
        <Header />
      </header>
      <div className="app-container">
        <main>
          <div className="controls">
            <button
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
        </main>
      </div>
      <footer>
        <Quotes />
      </footer>
    </>
  );
}

export default App;

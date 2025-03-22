import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";

function App() {
  const [showHiit, setShowHiit] = useState(true);
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

  useEffect(() => {
    localStorage.setItem("totalExercise", exerciseTime);
    localStorage.setItem("totalStudy", studyTime);
  }, [exerciseTime, studyTime]);

  return (
    <div className="app-container">
      <header>
        <Header />
      </header>
      <main>
        <div className="timer-container">
          {showHiit ? (
            <HiitTimer onTimeUpdate={setExerciseTime} />
          ) : (
            <Pomodoro onTimeUpdate={setStudyTime} />
          )}
        </div>
        <div className="controls">
          <button
            className="switch-timer-btn"
            onClick={() => setShowHiit(!showHiit)}
            aria-label={
              showHiit
                ? "Cambiar al temporizador de estudio (Pomodoro)"
                : "Cambiar al temporizador de ejercicio (HIIT)"
            }
          >
            {showHiit ? "Ir a Estudiar" : "Ir a Ejercicio"}
          </button>
        </div>
      </main>
      <footer>
        <Quotes />
      </footer>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";
import Charts from "./components/Charts";

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

  return (
    <div className="app-container">
      <header>
        <Header />
        <h1>Argestan</h1>
      </header>
      <main>
        <div className="timer-switch">
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
        </div>
        {showHiit ? (
          <HiitTimer onTimeUpdate={setExerciseTime} />
        ) : (
          <Pomodoro onTimeUpdate={setStudyTime} />
        )}
        <Quotes />
        <Charts exerciseTime={exerciseTime} studyTime={studyTime} />
      </main>
    </div>
  );
}

export default App;

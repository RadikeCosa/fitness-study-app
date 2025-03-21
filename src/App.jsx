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
        <section className="timers">
          <button
            onClick={() => setShowHiit(!showHiit)}
            aria-label={
              showHiit ? "Cambiar a modo Estudiar" : "Cambiar a modo Ejercicio"
            }
          >
            {showHiit ? "Estudiar" : "Hacer ejercicio"}
          </button>
          {showHiit ? (
            <HiitTimer onTimeUpdate={setExerciseTime} />
          ) : (
            <Pomodoro onTimeUpdate={setStudyTime} />
          )}
        </section>
        <section className="quotes">
          <Quotes />
        </section>
        <section className="charts">
          <Charts exerciseTime={exerciseTime} studyTime={studyTime} />
        </section>
      </main>
    </div>
  );
}

export default App;

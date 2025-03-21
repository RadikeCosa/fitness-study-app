import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";

function App() {
  const [showHiit, setShowHiit] = useState(true); // true = HIIT, false = Pomodoro

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
          {showHiit ? <HiitTimer /> : <Pomodoro />}
        </section>
        <section className="quotes">
          <Quotes />
        </section>
      </main>
    </div>
  );
}

export default App;

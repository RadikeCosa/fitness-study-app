import { useState, useEffect } from "react";

function Pomodoro() {
  const [studyTime, setStudyTime] = useState(25 * 60); // 25 minutos en segundos
  const [shortBreak, setShortBreak] = useState(5 * 60); // 5 minutos
  const [longBreak, setLongBreak] = useState(15 * 60); // 15 minutos
  const [cycles, setCycles] = useState(4); // Ciclos hasta descanso largo
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(studyTime);
  const [isStudy, setIsStudy] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalStudy, setTotalStudy] = useState(0); // Tiempo total estudiado

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      if (isStudy) {
        setTotalStudy((prev) => prev + studyTime);
        if (currentCycle < cycles) {
          setIsStudy(false);
          setCurrentTime(shortBreak);
          setCurrentCycle((prev) => prev + 1);
        } else {
          setIsStudy(false);
          setCurrentTime(longBreak);
          setCurrentCycle(1); // Reinicia ciclos tras descanso largo
        }
      } else {
        setIsStudy(true);
        setCurrentTime(studyTime);
      }
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    currentTime,
    isStudy,
    currentCycle,
    cycles,
    studyTime,
    shortBreak,
    longBreak,
  ]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <label>
        Estudio (min):
        <input
          type="number"
          value={studyTime / 60}
          onChange={(e) => setStudyTime(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <label>
        Descanso corto (min):
        <input
          type="number"
          value={shortBreak / 60}
          onChange={(e) => setShortBreak(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <label>
        Descanso largo (min):
        <input
          type="number"
          value={longBreak / 60}
          onChange={(e) => setLongBreak(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <label>
        Ciclos:
        <input
          type="number"
          value={cycles}
          onChange={(e) => setCycles(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <p>
        Ciclo {currentCycle}/{cycles} -{" "}
        {isStudy
          ? "Estudio"
          : currentCycle === 1
          ? "Descanso largo"
          : "Descanso corto"}
        : {formatTime(currentTime)}
      </p>
      <p>Tiempo total estudiado: {formatTime(totalStudy)}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pausar" : "Iniciar"}
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          setCurrentTime(studyTime);
          setCurrentCycle(1);
          setTotalStudy(0);
        }}
      >
        Reiniciar
      </button>
    </div>
  );
}

export default Pomodoro;

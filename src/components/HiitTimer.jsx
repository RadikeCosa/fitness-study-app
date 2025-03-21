import { useState, useEffect, useCallback } from "react";
import "./HiitTimer.css";

function HiitTimer({ onTimeUpdate }) {
  const [rounds, setRounds] = useState(45);
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime);
  const [isWork, setIsWork] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalExercise, setTotalExercise] = useState(() => {
    return parseInt(localStorage.getItem("totalExercise")) || 0;
  });
  const [dailyCycles, setDailyCycles] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const cycles = JSON.parse(localStorage.getItem("dailyCycles")) || {};
    return cycles[today] || 0;
  });

  const updateDailyExercise = useCallback(
    (newTotal) => {
      const today = new Date().toISOString().split("T")[0];
      const dailyExercise =
        JSON.parse(localStorage.getItem("dailyExercise")) || {};
      dailyExercise[today] =
        (dailyExercise[today] || 0) + (newTotal - totalExercise);
      localStorage.setItem("dailyExercise", JSON.stringify(dailyExercise));
    },
    [totalExercise]
  );

  const updateDailyCycles = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const cycles = JSON.parse(localStorage.getItem("dailyCycles")) || {};
    cycles[today] = (cycles[today] || 0) + 1;
    setDailyCycles(cycles[today]);
    localStorage.setItem("dailyCycles", JSON.stringify(cycles));
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev - 1;
          if (isWork) {
            setTotalExercise((prevTotal) => {
              const newTotal = prevTotal + 1;
              localStorage.setItem("totalExercise", newTotal);
              updateDailyExercise(newTotal);
              onTimeUpdate(newTotal);
              return newTotal;
            });
          }
          return newTime;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      if (isWork && currentRound < rounds) {
        setIsWork(false);
        setCurrentTime(restTime);
      } else if (!isWork && currentRound < rounds) {
        setIsWork(true);
        setCurrentTime(workTime);
        setCurrentRound((prev) => {
          updateDailyCycles();
          return prev + 1;
        });
      } else {
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    currentTime,
    isWork,
    currentRound,
    rounds,
    workTime,
    restTime,
    onTimeUpdate,
    updateDailyExercise,
    updateDailyCycles,
  ]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(workTime);
    setCurrentRound(1);
    setTotalExercise(0);
    localStorage.setItem("totalExercise", "0");
    updateDailyExercise(0);
    onTimeUpdate(0);
  };

  const getContainerClass = () => {
    if (isRunning && isWork) return "hiit-timer work";
    if (isRunning && !isWork) return "hiit-timer rest";
    return "hiit-timer base";
  };

  return (
    <div className={getContainerClass()}>
      <h2>HIIT Timer</h2>
      <div className="input-group">
        <label htmlFor="rounds-input">Rondas:</label>
        <input
          id="rounds-input"
          type="number"
          value={rounds}
          onChange={(e) => setRounds(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="work-input">Trabajo (s):</label>
        <input
          id="work-input"
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="rest-input">Descanso (s):</label>
        <input
          id="rest-input"
          type="number"
          value={restTime}
          onChange={(e) => setRestTime(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <p>
        Ronda {currentRound}/{rounds} - {isWork ? "Trabajo" : "Descanso"}:{" "}
        {currentTime}s
      </p>
      <p>Tiempo total ejercitado: {formatTime(totalExercise)}</p>
      <p>Ciclos completados hoy: {dailyCycles}</p>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default HiitTimer;

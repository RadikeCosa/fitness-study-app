import { useState, useEffect, useCallback } from "react";

function HiitTimer({ onTimeUpdate }) {
  const [rounds, setRounds] = useState(5);
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime);
  const [isWork, setIsWork] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalExercise, setTotalExercise] = useState(() => {
    return parseInt(localStorage.getItem("totalExercise")) || 0;
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

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev - 1;
          if (isWork) {
            setTotalExercise((prevTotal) => {
              const newTotal = prevTotal + 1; // Sumar 1 segundo
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
        setCurrentRound((prev) => prev + 1);
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
  ]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <h2>HIIT Timer</h2>
      <label>
        Rondas:
        <input
          type="number"
          value={rounds}
          onChange={(e) => setRounds(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <label>
        Trabajo (s):
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <label>
        Descanso (s):
        <input
          type="number"
          value={restTime}
          onChange={(e) => setRestTime(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </label>
      <p>
        Ronda {currentRound}/{rounds} - {isWork ? "Trabajo" : "Descanso"}:{" "}
        {currentTime}s
      </p>
      <p>Tiempo total ejercitado: {formatTime(totalExercise)}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pausar" : "Iniciar"}
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          setCurrentTime(workTime);
          setCurrentRound(1);
          setTotalExercise(0);
          localStorage.setItem("totalExercise", "0");
          updateDailyExercise(0);
          onTimeUpdate(0);
        }}
      >
        Reiniciar
      </button>
    </div>
  );
}

export default HiitTimer;

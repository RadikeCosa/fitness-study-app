import { useState, useEffect } from "react";

function HiitTimer() {
  const [rounds, setRounds] = useState(5);
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(workTime);
  const [isWork, setIsWork] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalExercise, setTotalExercise] = useState(0); // Tiempo total ejercitado

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      if (isWork && currentRound < rounds) {
        setIsWork(false);
        setCurrentTime(restTime);
        setTotalExercise((prev) => prev + workTime); // Sumamos el tiempo de trabajo
      } else if (!isWork && currentRound < rounds) {
        setIsWork(true);
        setCurrentTime(workTime);
        setCurrentRound((prev) => prev + 1);
      } else {
        setIsRunning(false);
        setTotalExercise((prev) => prev + (isWork ? workTime : 0)); // Sumamos el último trabajo si corresponde
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
  ]);

  // Función para formatear el tiempo total en minutos y segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
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
      <p>Tiempo total ejercitado: {formatTime(totalExercise)}</p>{" "}
      {/* Mostramos el tiempo total */}
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pausar" : "Iniciar"}
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          setCurrentTime(workTime);
          setCurrentRound(1);
          setTotalExercise(0); // Reiniciamos también el total
        }}
      >
        Reiniciar
      </button>
    </div>
  );
}

export default HiitTimer;

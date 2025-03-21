import { useState, useEffect, useCallback } from "react";

function Pomodoro({ onTimeUpdate }) {
  const [studyTime, setStudyTime] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(15 * 60);
  const [cycles, setCycles] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(studyTime);
  const [isStudy, setIsStudy] = useState(true);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalStudy, setTotalStudy] = useState(() => {
    return parseInt(localStorage.getItem("totalStudy")) || 0;
  });

  const updateDailyStudy = useCallback(
    (newTotal) => {
      const today = new Date().toISOString().split("T")[0];
      const dailyStudy = JSON.parse(localStorage.getItem("dailyStudy")) || {};
      dailyStudy[today] = (dailyStudy[today] || 0) + (newTotal - totalStudy);
      localStorage.setItem("dailyStudy", JSON.stringify(dailyStudy));
    },
    [totalStudy]
  );

  useEffect(() => {
    let interval;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev - 1;
          if (isStudy) {
            setTotalStudy((prevTotal) => {
              const newTotal = prevTotal + 1;
              localStorage.setItem("totalStudy", newTotal);
              updateDailyStudy(newTotal);
              onTimeUpdate(newTotal);
              return newTotal;
            });
          }
          return newTime;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      if (isStudy) {
        if (currentCycle < cycles) {
          setIsStudy(false);
          setCurrentTime(shortBreak);
          setCurrentCycle((prev) => prev + 1);
        } else {
          setIsStudy(false);
          setCurrentTime(longBreak);
          setCurrentCycle(1);
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
    onTimeUpdate,
    updateDailyStudy,
  ]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(studyTime);
    setCurrentCycle(1);
    setTotalStudy(0);
    localStorage.setItem("totalStudy", "0");
    updateDailyStudy(0);
    onTimeUpdate(0);
  };

  return (
    <div className="pomodoro">
      <h2>Pomodoro Timer</h2>
      <label htmlFor="study-input">Estudio (min):</label>
      <input
        id="study-input"
        type="number"
        value={studyTime / 60}
        onChange={(e) => setStudyTime(+e.target.value * 60)}
        disabled={isRunning}
        min="1"
      />
      <label htmlFor="short-break-input">Descanso corto (min):</label>
      <input
        id="short-break-input"
        type="number"
        value={shortBreak / 60}
        onChange={(e) => setShortBreak(+e.target.value * 60)}
        disabled={isRunning}
        min="1"
      />
      <label htmlFor="long-break-input">Descanso largo (min):</label>
      <input
        id="long-break-input"
        type="number"
        value={longBreak / 60}
        onChange={(e) => setLongBreak(+e.target.value * 60)}
        disabled={isRunning}
        min="1"
      />
      <label htmlFor="cycles-input">Ciclos:</label>
      <input
        id="cycles-input"
        type="number"
        value={cycles}
        onChange={(e) => setCycles(+e.target.value)}
        disabled={isRunning}
        min="1"
      />
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
      <button onClick={handleReset}>Reiniciar</button>
    </div>
  );
}

export default Pomodoro;

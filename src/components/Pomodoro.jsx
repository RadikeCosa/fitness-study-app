import { useState, useEffect, useCallback } from "react";
import "./Pomodoro.css";

function Pomodoro({ onTimeUpdate }) {
  const [blocks, setBlocks] = useState(1); // Cambiamos "cycles" a "blocks"
  const [studyTime, setStudyTime] = useState(25 * 60); // 25 min
  const [shortBreak, setShortBreak] = useState(5 * 60); // 5 min
  const [longBreak, setLongBreak] = useState(15 * 60); // 15 min
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(studyTime);
  const [isStudy, setIsStudy] = useState(true);
  const [currentBlock, setCurrentBlock] = useState(1); // Bloque actual
  const [subCycle, setSubCycle] = useState(1); // Sesión dentro del bloque (1 a 4)
  const [totalStudy, setTotalStudy] = useState(() => {
    return parseInt(localStorage.getItem("totalStudy")) || 0;
  });
  const [dailyBlocks, setDailyBlocks] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const blocks =
      JSON.parse(localStorage.getItem("dailyPomodoroBlocks")) || {};
    return blocks[today] || 0;
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

  const updateDailyBlocks = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const blocks =
      JSON.parse(localStorage.getItem("dailyPomodoroBlocks")) || {};
    blocks[today] = (blocks[today] || 0) + 1;
    setDailyBlocks(blocks[today]);
    localStorage.setItem("dailyPomodoroBlocks", JSON.stringify(blocks));
  }, []);

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
        if (subCycle < 3) {
          // Descanso corto después de las primeras 3 sesiones
          setIsStudy(false);
          setCurrentTime(shortBreak);
          setSubCycle((prev) => prev + 1);
        } else if (subCycle === 3) {
          // Última sesión del bloque, descanso largo
          setIsStudy(false);
          setCurrentTime(longBreak);
          setSubCycle(4);
        } else if (subCycle === 4) {
          // Fin del bloque
          if (currentBlock < blocks) {
            setIsStudy(true);
            setCurrentTime(studyTime);
            setSubCycle(1);
            setCurrentBlock((prev) => prev + 1);
          } else {
            setIsRunning(false);
            updateDailyBlocks();
          }
        }
      } else {
        // Fin de un descanso, volver a estudio
        setIsStudy(true);
        setCurrentTime(studyTime);
        if (subCycle < 4) setSubCycle((prev) => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    currentTime,
    isStudy,
    subCycle,
    currentBlock,
    blocks,
    studyTime,
    shortBreak,
    longBreak,
    onTimeUpdate,
    updateDailyStudy,
    updateDailyBlocks,
  ]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(studyTime);
    setCurrentBlock(1);
    setSubCycle(1);
    setTotalStudy(0);
    localStorage.setItem("totalStudy", "0");
    updateDailyStudy(0);
    onTimeUpdate(0);
  };

  const getContainerClass = () => {
    if (isRunning && isStudy) return "pomodoro study";
    if (isRunning && !isStudy && subCycle === 4) return "pomodoro long-break";
    if (isRunning && !isStudy) return "pomodoro short-break";
    return "pomodoro base";
  };

  const getPhaseLabel = () => {
    if (isStudy) return "Estudio";
    if (subCycle === 4) return "Descanso largo";
    return "Descanso corto";
  };

  return (
    <div className={getContainerClass()}>
      <h2>Pomodoro Timer</h2>
      <p className="info">Cada bloque = 3 sesiones cortas + 1 sesión larga</p>
      <div className="input-group">
        <label htmlFor="blocks-input">Bloques:</label>
        <input
          id="blocks-input"
          type="number"
          value={blocks}
          onChange={(e) => setBlocks(+e.target.value)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="study-input">Estudio (min):</label>
        <input
          id="study-input"
          type="number"
          value={studyTime / 60}
          onChange={(e) => setStudyTime(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="short-break-input">Descanso corto (min):</label>
        <input
          id="short-break-input"
          type="number"
          value={shortBreak / 60}
          onChange={(e) => setShortBreak(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="long-break-input">Descanso largo (min):</label>
        <input
          id="long-break-input"
          type="number"
          value={longBreak / 60}
          onChange={(e) => setLongBreak(+e.target.value * 60)}
          disabled={isRunning}
          min="1"
        />
      </div>
      <p>
        Sesión {subCycle}/4 del Bloque {currentBlock}/{blocks} -{" "}
        {getPhaseLabel()}: {formatTime(currentTime)}
      </p>
      <p>Tiempo total estudiado: {formatTime(totalStudy)}</p>
      <p>Bloques completados hoy: {dailyBlocks}</p>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Pomodoro;

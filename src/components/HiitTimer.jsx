import { useState, useEffect, useCallback } from "react";
import "./HiitTimer.css";

function HiitTimer({ onTimeUpdate }) {
  // Estado del temporizador
  const [timerState, setTimerState] = useState("idle"); // idle, work, rest
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo inicial en segundos
  const [currentRound, setCurrentRound] = useState(1);

  // Configuraciones
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [rounds, setRounds] = useState(8);

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formato del tiempo MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Memoizamos resetTimer con useCallback
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimerState("idle");
    setTimeLeft(workTime);
    setCurrentRound(1);
  }, [workTime]); // Dependencia: workTime

  // Lógica del temporizador
  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerState === "work") {
              onTimeUpdate((prev) => prev + workTime); // Reporta a TimerManager
              setTimerState("rest");
              return restTime;
            } else if (timerState === "rest") {
              if (currentRound < rounds) {
                setCurrentRound((prev) => prev + 1);
                setTimerState("work");
                return workTime;
              } else {
                resetTimer();
                return 0;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [
    isRunning,
    timerState,
    workTime,
    restTime,
    rounds,
    currentRound,
    onTimeUpdate,
    resetTimer,
  ]);

  // Alternar play/pause
  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (timerState === "idle") {
        setTimerState("work");
        setTimeLeft(workTime);
      }
      setIsRunning(true);
    }
  };

  // Aplicar configuraciones desde el modal
  const applySettings = () => {
    setWorkTime(parseInt(document.getElementById("workTime").value));
    setRestTime(parseInt(document.getElementById("restTime").value));
    setRounds(parseInt(document.getElementById("rounds").value));
    resetTimer();
    setIsModalOpen(false);
  };

  // Calcular progreso para la barra
  const progress =
    timerState === "work"
      ? ((workTime - timeLeft) / workTime) * 100
      : timerState === "rest"
      ? ((restTime - timeLeft) / restTime) * 100
      : 0;

  return (
    <div className="timer-card">
      {/* Pantalla del temporizador */}
      <div
        className={`timer-display ${
          timerState === "work" ? "work" : timerState === "rest" ? "rest" : ""
        }`}
      >
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="timer-content">
          <div className="time">{formatTime(timeLeft)}</div>
          <div className="phase">
            {timerState === "work"
              ? "WORK"
              : timerState === "rest"
              ? "REST"
              : "READY"}
          </div>
          {timerState !== "idle" && (
            <div className="round-info">
              Round {currentRound} of {rounds}
            </div>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="controls">
        <button
          className="btn btn-reset"
          onClick={resetTimer}
          disabled={!isRunning && timerState === "idle"}
        >
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
        <button
          className={`btn ${isRunning ? "btn-pause" : "btn-play"}`}
          onClick={toggleTimer}
        >
          {isRunning ? (
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className="btn btn-settings"
          onClick={() => setIsModalOpen(true)}
        >
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>
      </div>

      {/* Información de configuraciones */}
      <div className="settings-info">
        Work: {workTime}s • Rest: {restTime}s • Rounds: {rounds}
      </div>

      {/* Modal de configuraciones */}
      {isModalOpen && (
        <div
          className="modal open"
          onClick={(e) =>
            e.target.className === "modal open" && setIsModalOpen(false)
          }
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Timer Settings</h3>
            </div>
            <div className="modal-body">
              <div className="setting-group">
                <label className="setting-label" htmlFor="workTime">
                  Work Time: <span>{workTime}</span> seconds
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="workTime"
                    className="slider"
                    min="5"
                    max="120"
                    step="5"
                    defaultValue={workTime}
                  />
                  <input
                    type="number"
                    className="number-input"
                    min="5"
                    max="120"
                    defaultValue={workTime}
                  />
                </div>
              </div>
              <div className="setting-group">
                <label className="setting-label" htmlFor="restTime">
                  Rest Time: <span>{restTime}</span> seconds
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="restTime"
                    className="slider"
                    min="5"
                    max="120"
                    step="5"
                    defaultValue={restTime}
                  />
                  <input
                    type="number"
                    className="number-input"
                    min="5"
                    max="120"
                    defaultValue={restTime}
                  />
                </div>
              </div>
              <div className="setting-group">
                <label className="setting-label" htmlFor="rounds">
                  Rounds: <span>{rounds}</span>
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="rounds"
                    className="slider"
                    min="1"
                    max="20"
                    step="1"
                    defaultValue={rounds}
                  />
                  <input
                    type="number"
                    className="number-input"
                    min="1"
                    max="20"
                    defaultValue={rounds}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-apply" onClick={applySettings}>
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HiitTimer;

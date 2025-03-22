// src/hooks/useExerciseTime.js
import { useState, useEffect } from "react";

function useExerciseTime() {
  const [totalSessionTime, setTotalSessionTime] = useState(0); // Última sesión
  const [totalDailyTime, setTotalDailyTime] = useState(0); // Total del día
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0); // Últimos 7 días

  useEffect(() => {
    const loadTimes = () => {
      const now = new Date();
      const todayKey = `exercise_${now.toDateString()}`;
      const daily = parseInt(localStorage.getItem(todayKey) || "0", 10);
      setTotalDailyTime(daily);

      let weekly = 0;
      for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const key = `exercise_${date.toDateString()}`;
        weekly += parseInt(localStorage.getItem(key) || "0", 10);
      }
      setTotalWeeklyTime(weekly);
    };

    loadTimes();
  }, []);

  const logSessionTime = (seconds) => {
    const now = new Date();
    const todayKey = `exercise_${now.toDateString()}`;
    const currentDaily = parseInt(localStorage.getItem(todayKey) || "0", 10);
    const newDaily = currentDaily + seconds;

    localStorage.setItem(todayKey, newDaily);
    setTotalSessionTime(seconds); // Solo la última sesión
    setTotalDailyTime(newDaily);

    let weekly = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const key = `exercise_${date.toDateString()}`;
      weekly += parseInt(localStorage.getItem(key) || "0", 10);
    }
    setTotalWeeklyTime(weekly);
  };

  return { totalSessionTime, totalDailyTime, totalWeeklyTime, logSessionTime };
}

export default useExerciseTime;

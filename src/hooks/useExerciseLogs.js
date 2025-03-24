// src/hooks/useExerciseLogs.js
import { useCallback } from "react";

function useExerciseLogs() {
  const saveLog = useCallback((date, minutes) => {
    const logs = JSON.parse(localStorage.getItem("exerciseLogs") || "{}");
    logs[date] = (logs[date] || 0) + minutes;
    localStorage.setItem("exerciseLogs", JSON.stringify(logs));
  }, []);

  return { saveLog };
}

export default useExerciseLogs;

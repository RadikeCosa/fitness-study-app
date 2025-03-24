// src/hooks/useExerciseStats.js
import { useMemo } from "react";

export function useExerciseStats(logs = {}) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0); // Normalizar a medianoche UTC
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      days.push({ date: key, minutes: logs[key] || 0 });
    }
    return days.reverse();
  };

  const data = useMemo(() => getLast7Days(), [logs]);
  const totalMinutes = data.reduce((sum, { minutes }) => sum + minutes, 0);
  const averageMinutes = totalMinutes / 7 || 0;
  const activeDays = data.filter((d) => d.minutes > 0);
  const maxDay = activeDays.length
    ? activeDays.reduce((max, curr) =>
        curr.minutes > max.minutes ? curr : max
      )
    : { date: "", minutes: 0 };
  const minDay = activeDays.length
    ? activeDays.reduce((min, curr) =>
        curr.minutes < min.minutes ? curr : min
      )
    : { date: "", minutes: 0 };
  const trend =
    totalMinutes > averageMinutes * 7 ? "positiva" : "negativa o estable";

  return { data, totalMinutes, averageMinutes, maxDay, minDay, trend };
}

// src/hooks/useExerciseStats.js
import { useMemo } from "react";

export function useExerciseStats(logs = {}) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
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

  // Cálculo corregido de trend
  const trend = (() => {
    if (data.length < 7) return "sin datos suficientes";
    const earlyDays = data.slice(0, 3); // Primeros 3 días
    const lateDays = data.slice(-3); // Últimos 3 días
    const earlySum = earlyDays.reduce((sum, d) => sum + d.minutes, 0);
    const lateSum = lateDays.reduce((sum, d) => sum + d.minutes, 0);
    if (lateSum > earlySum) return "positiva";
    if (lateSum < earlySum) return "negativa";
    return "estable";
  })();

  return { data, totalMinutes, averageMinutes, maxDay, minDay, trend };
}

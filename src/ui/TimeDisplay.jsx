// src/components/ui/TimeDisplay.jsx
import React, { useState, useEffect } from "react";
import "./TimeDisplay.css";

function TimeDisplay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString("es-ES"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("es-ES"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="time-display">{time}</span>;
}

export default TimeDisplay;

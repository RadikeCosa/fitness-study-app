//src\ui\DateDisplay.jsx
import React, { useState, useEffect } from "react";
import "./TimeDisplay.css";

function TimeDisplay() {
  const getFormattedTime = () =>
    new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const updateClock = () => {
      setTime(getFormattedTime());
      setTimeout(updateClock, 60000);
    };

    const now = new Date();
    const secondsToNextMinute = 60 - now.getSeconds();
    const initialTimeout = setTimeout(() => {
      updateClock();
    }, secondsToNextMinute * 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return <div className="time-display">{time} hs</div>;
}

export default TimeDisplay;

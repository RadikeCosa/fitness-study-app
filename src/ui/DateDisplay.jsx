// src/components/ui/DateDisplay.jsx
import React from "react";
import "./DateDisplay.css";

function DateDisplay() {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <span className="date-display">{today}</span>;
}

export default DateDisplay;

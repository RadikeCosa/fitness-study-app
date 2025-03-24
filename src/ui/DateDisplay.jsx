import React from "react";
import "./DateDisplay.css";

function DateDisplay() {
  const now = new Date();

  // Capitalizar la primera letra del día
  const dayName = now.toLocaleDateString("es-ES", { weekday: "long" });

  // Formato dd/mm/aa
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // getMonth() es base 0
  const year = now.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="date-display">
      <div className="day">{dayName}</div>
      <div className="date">{formattedDate}</div>
    </div>
  );
}

export default DateDisplay;

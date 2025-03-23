// src/components/exercise/DateSelector.jsx
import React from "react";
import "./DateSelector.css";

function DateSelector({ value, onChange }) {
  const getDateOptions = () => {
    const options = [];
    for (let i = 0; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const value = date.toISOString().split("T")[0];
      options.push(
        <option key={value} value={value}>
          {date.toLocaleDateString("es-ES", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="date-selector">
      <label htmlFor="manual-date">Fecha:</label>
      <select id="manual-date" value={value} onChange={onChange}>
        {getDateOptions()}
      </select>
    </div>
  );
}

export default DateSelector;

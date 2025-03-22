import { useState } from "react";
import "./Header.css";

function Header() {
  const date = new Date();
  const formattedDateDay = date.toLocaleDateString("es-ES", {
    weekday: "long",
  });
  const formattedDateNum = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [is24Hour, setIs24Hour] = useState(true);
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !is24Hour, // Cambia entre 24h y 12h (AM/PM)
  });

  const toggleTimeFormat = () => setIs24Hour((prev) => !prev);

  return (
    <div className="header-container">
      <div className="header-date">
        <span className="header-day">{formattedDateDay}</span>
        <span className="header-num">{formattedDateNum}</span>
      </div>
      <h1 className="header-title">Argestan</h1>
      <div className="header-time">
        <span>{formattedTime}</span>
        <button onClick={toggleTimeFormat} aria-label="Cambiar formato de hora">
          {is24Hour ? "12h" : "24h"}
        </button>
      </div>
    </div>
  );
}

export default Header;

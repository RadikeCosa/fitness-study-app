import { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTime(new Date()); // Establece la hora inicial
    const timer = setInterval(() => setTime(new Date()), 60 * 1000); // Actualiza cada minuto
    return () => clearInterval(timer);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = time.toLocaleDateString("es-ES", options);
  const timeStr = time.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }); // Sin segundos

  return (
    <header>
      <h1>
        {dateStr}, {timeStr}
      </h1>
    </header>
  );
}

export default Header;

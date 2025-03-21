import { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = time.toLocaleDateString("es-ES", options);
  const timeStr = time.toLocaleTimeString("es-ES");

  return (
    <header>
      <h1>
        {dateStr}, {timeStr}
      </h1>
    </header>
  );
}

export default Header;

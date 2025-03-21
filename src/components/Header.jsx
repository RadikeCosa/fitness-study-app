import { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    // Calcular milisegundos hasta el próximo minuto
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const msUntilNextMinute =
      secondsUntilNextMinute * 1000 - now.getMilliseconds();

    // Primer cambio alineado al próximo minuto
    const initialTimeout = setTimeout(() => {
      updateTime();
      // Después del primer cambio, intervalo fijo de 60 segundos
      const interval = setInterval(updateTime, 60 * 1000);
      // Limpieza del intervalo al desmontar
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    // Limpieza del timeout inicial al desmontar
    return () => clearTimeout(initialTimeout);
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
  });

  return (
    <header>
      <h1>
        {dateStr}, {timeStr}
      </h1>
    </header>
  );
}

export default Header;

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
  const dateISO = date.toISOString().split("T")[0]; // Para datetime
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="header-container">
      <time className="header-date" dateTime={dateISO}>
        <span className="header-day">{formattedDateDay}</span>
        <span className="header-num">{formattedDateNum}</span>
      </time>
      <h1 className="header-title">Argestan</h1>
      <time className="header-time" dateTime={date.toISOString()}>
        <span>{formattedTime}</span>
      </time>
    </header>
  );
}

export default Header;

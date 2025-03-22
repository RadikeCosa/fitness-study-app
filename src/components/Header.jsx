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
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="header-container">
      <div className="header-date">
        <span className="header-day">{formattedDateDay}</span>
        <span className="header-num">{formattedDateNum}</span>
      </div>
      <h1 className="header-title">Argestan</h1>
      <div className="header-time">
        <span>{formattedTime}</span>
      </div>
    </div>
  );
}

export default Header;

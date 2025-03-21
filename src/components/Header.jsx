import "./Header.css";

function Header() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="header-content">
      <div className="header-top">
        <span className="header-date">{formattedDate}</span>
        <span className="header-time">{formattedTime}</span>
      </div>
      <h1 className="header-title">Argestan</h1>
    </div>
  );
}

export default Header;

import { useState } from "react";
import "./Quotes.css";

function Quotes() {
  const quotes = [
    "“El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.” – Albert Schweitzer",
    "“La disciplina es el puente entre metas y logros.” – Jim Rohn",
    "“No te rindas, el comienzo es siempre lo más difícil.” – Proverbio",
    "“El único lugar donde el éxito viene antes que el trabajo es en el diccionario.” – Vidal Sassoon",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const handleNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="quotes">
      <p>{quotes[currentQuote]}</p>
      <button
        onClick={handleNextQuote}
        aria-label="Cambiar frase motivacional"
        className="quote-button"
      >
        ↻
      </button>
    </div>
  );
}

export default Quotes;

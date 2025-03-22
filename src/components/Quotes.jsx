import { useState } from "react";
import "./Quotes.css";

function Quotes() {
  const quotes = [
    {
      text: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
      author: "Albert Schweitzer",
    },
    {
      text: "La disciplina es el puente entre metas y logros.",
      author: "Jim Rohn",
    },
    {
      text: "No te rindas, el comienzo es siempre lo más difícil.",
      author: "Proverbio",
    },
    {
      text: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
      author: "Vidal Sassoon",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const handleNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  return (
    <footer className="quotes">
      <blockquote>
        <p>{quotes[currentQuote].text}</p>
        <cite>— {quotes[currentQuote].author}</cite>
      </blockquote>
      <button
        onClick={handleNextQuote}
        aria-label="Cambiar a la siguiente frase motivacional"
      >
        ↻
      </button>
    </footer>
  );
}

export default Quotes;

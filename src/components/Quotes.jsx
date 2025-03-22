// src/components/Quotes.jsx
import { useState } from "react";
import "./Quotes.css";
import quotes from "../data/quotes.json";

function Quotes() {
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

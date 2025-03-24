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
    <blockquote className="blockquote" onClick={handleNextQuote}>
      <p>{quotes[currentQuote].text}</p>
      <cite>— {quotes[currentQuote].author}</cite>
    </blockquote>
  );
}

export default Quotes;

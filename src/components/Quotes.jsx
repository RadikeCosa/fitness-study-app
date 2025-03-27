// src/components/Quotes.jsx
import { useState, useEffect } from "react";
import "./Quotes.css";

function Quotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/quote/all`;
        console.log("Fetching from:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`Error al cargar las citas: ${response.status}`);
        const data = await response.json();
        setQuotes(data);
        console.log("Datos Recibidos", data);
      } catch (err) {
        setError("Error", err);
      }
    }
    fetchQuotes();
  }, []);

  const handleNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };
  if (error) return <p>{error}</p>;
  if (quotes.length === 0) return <p>Cargando citas...</p>;
  return (
    <blockquote className="blockquote" onClick={handleNextQuote}>
      <p>{quotes[currentQuote].text}</p>
      <cite>— {quotes[currentQuote].author}</cite>
    </blockquote>
  );
}

export default Quotes;

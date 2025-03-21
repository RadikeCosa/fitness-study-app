import { useState, useEffect } from "react";
import quotes from "../data/quotes.json";

function Quotes() {
  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });
  const [intervalTime, setIntervalTime] = useState(10 * 60 * 1000); // 10 minutos

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote(); // Carga inicial
    const interval = setInterval(getRandomQuote, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime]);

  return (
    <section aria-labelledby="quotes-title">
      <h2 id="quotes-title">Frase del momento</h2>
      <blockquote>
        <p>{currentQuote.text}</p>
        <cite>— {currentQuote.author}</cite>
      </blockquote>
      <button onClick={getRandomQuote}>Nueva frase</button>
      <label>
        Cambiar cada (min):
        <input
          type="number"
          value={intervalTime / (60 * 1000)}
          onChange={(e) => setIntervalTime(+e.target.value * 60 * 1000)}
          min="1"
        />
      </label>
    </section>
  );
}

export default Quotes;

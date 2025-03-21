import { useState, useEffect } from "react";
import quotes from "../data/quotes.json";

function Quotes() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [intervalTime, setIntervalTime] = useState(10 * 60 * 1000); // 10 minutos en milisegundos

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
    <div>
      <h2>Frase del momento</h2>
      <p>{currentQuote}</p>
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
    </div>
  );
}

export default Quotes;

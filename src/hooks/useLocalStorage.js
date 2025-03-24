// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Inicializar el estado con lo que haya en localStorage o el valor inicial
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return initialValue;
    }
  });

  // Guardar en localStorage cada vez que 'value' cambie
  useEffect(() => {
    try {
      console.log("useLocalStorage - Guardando en localStorage:", value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

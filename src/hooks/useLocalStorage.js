// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialValue)
    );
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setValue(
        JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
      );
    };
    window.addEventListener("storage", handleStorageChange);
    // Escucha cambios manuales en la misma pestaña
    const checkStorage = () => {
      const newValue = JSON.parse(
        localStorage.getItem(key) || JSON.stringify(initialValue)
      );
      if (JSON.stringify(newValue) !== JSON.stringify(value)) {
        setValue(newValue);
      }
    };
    const interval = setInterval(checkStorage, 500); // Revisar cada 0.5s
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;

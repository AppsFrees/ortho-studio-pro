import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item != null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error leyendo localStorage para la clave "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error escribiendo localStorage para la clave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

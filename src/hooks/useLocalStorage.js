import { useEffect, useState } from 'react';

// Custom hook: useState that syncs to localStorage (Browser storage + JSON).
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked - ignore */
    }
  }, [key, value]);

  return [value, setValue];
}

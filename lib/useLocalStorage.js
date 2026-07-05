'use client';
import { useEffect, useState } from 'react';

// Penyimpanan localStorage aman dari hydration mismatch.
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(key);
      if (s !== null) setValue(JSON.parse(s));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value, loaded]);

  return [value, setValue, loaded];
}

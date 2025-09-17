
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    const stored = localStorage.getItem('theme-dark');
    if (stored === '1' || stored === '0') {
      const saved = stored === '1';
      setDark(saved);
      document.documentElement.classList.toggle('dark', saved);
    } else {
      const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(prefers);
      document.documentElement.classList.toggle('dark', prefers);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme-dark', next ? '1' : '0');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <button onClick={toggle} className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10">
      {dark ? '☾' : '☀︎'}
    </button>
  );
}

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="px-3 py-1.5 rounded-full border border-gedo-green text-gedo-green hover:bg-gedo-green hover:text-white transition text-sm"
      title="Toggle theme"
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}


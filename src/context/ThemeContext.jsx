import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [bg, setBg] = useState(() => localStorage.getItem('theme-bg') || 'obsidian');
  const [acc, setAcc] = useState(() => localStorage.getItem('theme-acc') || 'cyan');

  useEffect(() => {
    localStorage.setItem('theme-bg', bg);
    localStorage.setItem('theme-acc', acc);
    document.body.className = `bg-${bg} acc-${acc}`;
  }, [bg, acc]);

  return (
    <ThemeContext.Provider value={{ bg, setBg, acc, setAcc }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

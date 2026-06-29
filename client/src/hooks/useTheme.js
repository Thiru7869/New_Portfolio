import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  const meta = document.getElementById('themeColorMeta');
  if (meta) meta.content = theme === 'dark' ? '#0a0a0a' : '#ffffff';
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    const value = typeof next === 'function' ? next(theme) : next;
    localStorage.setItem(STORAGE_KEY, value);
    setThemeState(value);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, setTheme, toggle, isDark: theme === 'dark' };
}

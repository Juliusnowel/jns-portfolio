"use client";

import { useEffect, useReducer } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";
let cachedIsDark: boolean | null = null;

type ThemeState = {
  isDark: boolean;
  isReady: boolean;
};

type ThemeAction =
  | { type: "init"; payload: boolean }
  | { type: "toggle" };

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "init":
      return { isDark: action.payload, isReady: true };
    case "toggle":
      return { ...state, isDark: !state.isDark };
    default:
      return state;
  }
}

export function useThemeMode() {
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: cachedIsDark ?? true,
    isReady: cachedIsDark !== null,
  });
  const { isDark, isReady } = state;

  useEffect(() => {
    if (cachedIsDark !== null) return;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const nextIsDark = stored !== "light";
    cachedIsDark = nextIsDark;
    dispatch({ type: "init", payload: nextIsDark });
  }, []);

  useEffect(() => {
    if (!isReady) return;
    cachedIsDark = isDark;
    const nextTheme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }, [isDark, isReady]);

  const toggleTheme = () => {
    dispatch({ type: "toggle" });
  };

  return { isDark, toggleTheme, isReady };
}

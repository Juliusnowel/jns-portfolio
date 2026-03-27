"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

export default function ThemeSync() {
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    document.documentElement.dataset.theme =
      stored === "light" ? "light" : "dark";
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

export default function ThemeSync() {
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    // Light is the default; dark only when the visitor chose it before.
    document.documentElement.dataset.theme =
      stored === "dark" ? "dark" : "light";
  }, []);

  return null;
}

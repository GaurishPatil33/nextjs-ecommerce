// src/components/ThemeToggle.tsx
"use client";

import { useThemeStore } from "@/lib/store/themeStore";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

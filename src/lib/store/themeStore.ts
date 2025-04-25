// src/lib/store/themeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Read the system preference once
const prefersDark = 
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // On first load, use persisted value if any; otherwise use system preference
      darkMode: get()?.darkMode ?? prefersDark,
      toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "theme-store" }
  )
);

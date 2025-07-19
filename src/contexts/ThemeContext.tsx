import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  ReactNode,
  Dispatch,
  useContext,
} from "react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../theme/config";
import { ThemeStyles } from "../theme/styles";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
}

export type ThemeMode = "light" | "dark" | "system";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ThemeMode => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("themeMode") as ThemeMode) || "system";
  };

  const resolveTheme = (mode: ThemeMode): "light" | "dark" => {
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return mode;
  };

  const [mounted, setMounted] = useState(false);

  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    resolveTheme(themeMode)
  );

  // This is used to avoid flash of unstyled content (FOUC)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Attach a listener to the system theme change
  // This will update the theme if the user changes
  // their system preference while the app is running
  useEffect(() => {
    if (themeMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setResolvedTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  // Update the resolved theme whenever the theme mode changes
  // and store the current theme in localStorage
  useEffect(() => {
    const nextResolved = resolveTheme(themeMode);
    setResolvedTheme(nextResolved);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Prevent hydration mismatch (FOUC)
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <EmotionThemeProvider
        theme={resolvedTheme === "dark" ? darkTheme : lightTheme}
      >
        <ThemeStyles />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider");
  return ctx;
};

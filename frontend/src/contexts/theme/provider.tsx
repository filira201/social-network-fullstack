import {
  useCallback,
  useEffect,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../../hooks";
import { ThemeContext } from "./context";

interface ThemeConextProviderProps {
  children: ReactNode;
}

export const ThemeConextProvider: FC<ThemeConextProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  const toggleTheme = useCallback(() => {
    setDarkMode((mode) => !mode);
  }, [setDarkMode]);

  const contextValue = useMemo(
    () => ({ toggleTheme, darkMode }),
    [darkMode, toggleTheme]
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.className = "dark text-foreground bg-background";
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.body.className = "light text-foreground bg-background";
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

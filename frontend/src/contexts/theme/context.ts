import { createContext } from "react";
import type { ThemeContextType } from "../../lib";

export const ThemeContext = createContext<ThemeContextType | null>(null);

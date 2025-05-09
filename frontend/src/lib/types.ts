export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export type MyButtonType = "button" | "submit" | "reset";
export type MyButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

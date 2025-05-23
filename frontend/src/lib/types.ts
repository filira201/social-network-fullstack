import type { User } from "./models";

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

export type AuthKeys = "login" | "sign-up";

export type CreatePostFiled = {
  post: string;
};
export type CreateCommentFiled = {
  comment: string;
};

export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
};

export type CardFor = "comment" | "post" | "currentPost";

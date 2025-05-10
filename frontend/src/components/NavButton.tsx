import type { FC, JSX, ReactNode } from "react";
import MyButton from "./MyButton";
import { NavLink } from "react-router";

interface NavButtonProps {
  children: ReactNode;
  icon: JSX.Element;
  href: string;
}

const NavButton: FC<NavButtonProps> = ({ children, icon, href }) => {
  return (
    <MyButton className="flex justify-start text-xl" icon={icon}>
      <NavLink
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8" : ""
        }
        to={href}
      >
        {children}
      </NavLink>
    </MyButton>
  );
};

export default NavButton;

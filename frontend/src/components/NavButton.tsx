import type { FC, JSX, ReactNode } from "react";
import MyButton from "./MyButton";
import { Link } from "react-router";

interface NavButtonProps {
  children: ReactNode;
  icon: JSX.Element;
  href: string;
}

const NavButton: FC<NavButtonProps> = ({ children, icon, href }) => {
  return (
    <MyButton className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </MyButton>
  );
};

export default NavButton;

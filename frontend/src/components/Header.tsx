import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useGetTheme } from "../contexts/theme/useGetTheme";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

const Header = () => {
  const { darkMode, toggleTheme } = useGetTheme();

  return (
    <Navbar className="bg-white text-black dark:bg-black dark:text-white">
      <NavbarBrand>
        <p className="font-bold text-inherit">Social Network</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          onClick={toggleTheme}
          className="text-3xl cursor-pointer lg:flex"
        >
          {!darkMode ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import { useGetTheme } from "../contexts/theme/useGetTheme";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

const Header = () => {
  const { darkMode, toggleTheme } = useGetTheme();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Social Network</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Switch
          isSelected={!darkMode}
          onValueChange={toggleTheme}
          endContent={<LuSunMedium />}
          startContent={<FaRegMoon />}
          size="lg"
        ></Switch>

        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

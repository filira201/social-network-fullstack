import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import { useGetTheme } from "../contexts/theme/useGetTheme";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router";
import { logout } from "../features/userSlice";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const { darkMode, toggleTheme } = useGetTheme();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/auth");
  };

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

        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onPress={handleLogout}
            >
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

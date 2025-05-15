import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from "@heroui/react";
import { useGetTheme } from "../contexts/theme/useGetTheme";
import { FaRegMoon, FaUsers } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router";
import { logout } from "../features/userSlice";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { NavButton } from ".";
import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const Header = () => {
  const { darkMode, toggleTheme } = useGetTheme();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <Navbar
      isBordered
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Social Network</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden lg:flex">
        <p className="font-bold text-inherit">Social Network</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            isSelected={!darkMode}
            onValueChange={toggleTheme}
            endContent={<LuSunMedium />}
            startContent={<FaRegMoon />}
            size="lg"
          />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
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

      <NavbarMenu className="flex items-center">
        <NavbarMenuItem>
          <NavButton
            handlePress={() => setIsMenuOpen(false)}
            href="/"
            icon={<BsPostcard />}
          >
            Посты
          </NavButton>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavButton
            handlePress={() => setIsMenuOpen(false)}
            href="/following"
            icon={<FiUsers />}
          >
            Подписки
          </NavButton>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavButton
            handlePress={() => setIsMenuOpen(false)}
            href="/followers"
            icon={<FaUsers />}
          >
            Подписчики
          </NavButton>
        </NavbarMenuItem>
        <NavbarMenuItem>
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
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

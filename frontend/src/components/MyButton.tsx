import type { FC, JSX, ReactNode } from "react";
import type { MyButtonColor, MyButtonType } from "../lib";
import { Button } from "@heroui/react";

interface MyBittonProps {
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: MyButtonType;
  fullWidth?: boolean;
  color?: MyButtonColor;
  handlePress?: () => void;
}

const MyButton: FC<MyBittonProps> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
  handlePress,
}) => {
  return (
    <Button
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
      onPress={handlePress}
    >
      {children}
    </Button>
  );
};

export default MyButton;

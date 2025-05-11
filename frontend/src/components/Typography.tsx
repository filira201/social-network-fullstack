import type { FC, ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  size?: string;
}

const Typography: FC<TypographyProps> = ({ children, size = "text-xl" }) => {
  return <p className={`${size}`}>{children}</p>;
};

export default Typography;

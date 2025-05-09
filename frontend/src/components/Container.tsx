import type { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <main className="flex max-w-screen-xl mx-auto mt-10">{children}</main>;
};

export default Container;

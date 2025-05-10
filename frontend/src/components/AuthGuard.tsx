import type { FC, ReactNode } from "react";
import { useCurrentQuery } from "../services/userApi";
import { Spinner } from "@heroui/react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner color="primary" labelColor="primary" label="Загрузка..." />
      </div>
    );
  }

  return children;
};

export default AuthGuard;

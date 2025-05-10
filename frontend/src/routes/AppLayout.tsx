import { Outlet, useNavigate } from "react-router";
import { Container, Header, NavBar } from "../components";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";

const AppLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Container>
        <div className="p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default AppLayout;

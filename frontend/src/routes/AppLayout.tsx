import { Outlet, useNavigate } from "react-router";
import { Container, Header, NavBar, Profile } from "../components";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";

const AppLayout = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
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
        <div className="flex-1 p-4">
          <NavBar />
        </div>
        <div className="flex-2 p-4">
          <Outlet />
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};

export default AppLayout;

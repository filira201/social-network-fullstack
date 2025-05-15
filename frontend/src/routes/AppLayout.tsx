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
        <div className="hidden p-4 order-1 lg:block lg:order-1">
          <NavBar />
        </div>

        {!user && (
          <div className="p-4 order-1 w-full lg:order-3 md:flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-5">
              <Profile />
            </div>
          </div>
        )}

        <div className="p-4 order-2 flex-2 lg:order-2">
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default AppLayout;

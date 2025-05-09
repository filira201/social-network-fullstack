import { Outlet } from "react-router";
import { Container, Header, NavBar } from "../components";

const AppLayout = () => {
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

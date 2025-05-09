import routerBuilder from "./routes/routerBuilder";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = () => {
  //TODO: МБ добавить Toaster из "sonner" сюда или в AppLayout
  const routes = useMemo(() => routerBuilder(), []);
  return (
    <div className="main-wrapper">
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
};

export default App;

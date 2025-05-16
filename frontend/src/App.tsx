import routerBuilder from "./routes/routerBuilder";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = () => {
  //TODO: Обработка ошибок
  const routes = useMemo(() => routerBuilder(), []);
  return (
    <div className="main-wrapper">
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
};

export default App;

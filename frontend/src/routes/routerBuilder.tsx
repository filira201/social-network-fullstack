import AppLayout from "./AppLayout";
import {
  Auth,
  CurrentPost,
  Followers,
  Following,
  Posts,
  UserProfile,
} from "./pages";

const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: "/",
      element: <Posts />,
    },
    {
      path: "/posts/:id",
      element: <CurrentPost />,
    },
    {
      path: "/users/:id",
      element: <UserProfile />,
    },
    {
      path: "/followers",
      element: <Followers />,
    },
    {
      path: "/following",
      element: <Following />,
    },
  ];

  const routes = [
    {
      element: <AppLayout />,
      children: generalRoutes,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ];

  return routes;
};

export default RouterBuilder;

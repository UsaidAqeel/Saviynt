import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout pageTitle="CUSTOMERS">Hello</Layout>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

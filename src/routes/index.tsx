import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout pageTitle="CUSTOMERS">
        <Home />
      </Layout>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

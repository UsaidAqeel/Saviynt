import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Layout } from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout>Hello</Layout>,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;

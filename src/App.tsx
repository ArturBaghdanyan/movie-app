import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/homePage/Home";
import Layout from "./pages/Layout";
import { ImagesProvider } from "./context/ImagesProvider";

// This component acts as the provider for all child routes
const RouterWrapper = () => (
  <ImagesProvider>
    <Outlet />
  </ImagesProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterWrapper />, // The Provider now lives INSIDE the Router context
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

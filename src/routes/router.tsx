import { createBrowserRouter } from "react-router"
import Private from "./Private"
import Layout from "../components/Layout"
import Home from "../pages/home"
import Login from "../pages/login"
import Admin from "../pages/admin"
import Network from "../pages/network"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/admin",
        element: <Private><Admin /></Private>
      },
      {
        path: "/admin/network",
        element: <Private><Network /></Private>
      }
    ]
  }
])

export { router }
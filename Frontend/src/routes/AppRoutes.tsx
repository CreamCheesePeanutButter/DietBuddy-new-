import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import SignUp from "../pages/SignUpPage";
import SignIn from "../pages/SignInPage";
import { DishesPage } from "../pages/DishesPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "dishes",
        element: <DishesPage />,
      },
    ],
  },
]);

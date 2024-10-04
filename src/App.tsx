import styles from "./App.module.scss";
import HomePage from "./pages/HomePage/HomePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import BookingTabs from "./components/BookingTabs/BookingTabs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountTab from "./components/AccountTab/AccountTab";

const router = createBrowserRouter([
  {
    path: "/home",
    Component: HomePage,
    children: [
      {
        index: true, // Default route is BookingTabs
        Component: BookingTabs,
      },
      {
        path: "account",
        Component: AccountTab, // Account settings route
      },
    ],
  },
  {
    path: "/",
    Component: LogInPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

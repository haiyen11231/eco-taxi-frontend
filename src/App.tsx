// import styles from "./App.module.scss";
import HomePage from "./pages/HomePage/HomePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import BookingTabs from "./components/BookingTabs/BookingTabs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountTabs from "./components/AccountTabs/AccountTabs";
import AccountTab from "./components/AccountTab/AccountTab";
import PaymentTab from "./components/PaymentTab/PaymentTab";
import BookingTab from "./components/BookingTab/BookingTab";
import StatusTab from "./components/StatusTab/StatusTab";
import HistoryTab from "./components/HistoryTab/HistoryTab";

const router = createBrowserRouter([
  {
    path: "/home",
    Component: HomePage,
    children: [
      {
        index: true, // Default route under /home
        Component: BookingTabs,
      },
      {
        path: "booking",
        Component: BookingTabs, // Use BookingTabs layout
        children: [
          {
            index: true,
            Component: BookingTab,
          },
          {
            path: "status",
            Component: StatusTab,
          },
          {
            path: "history",
            Component: HistoryTab,
          },
        ],
      },
      {
        path: "account",
        Component: AccountTabs,
        children: [
          {
            index: true,
            Component: AccountTab,
          },
          {
            path: "payment",
            Component: PaymentTab,
          },
        ],
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

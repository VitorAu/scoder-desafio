import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/login-page/index";
import { TransactionsPage } from "./pages/transactions-page/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/transactions",
    element: <TransactionsPage />,
  },
]);

export function App() {
  return (
    <div className="overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

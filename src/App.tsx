import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Login,
  OrderConfirmation,
  OrderHistory,
  Register,
  Search,
  Shop,
  SingleOrderHistory,
  SingleProduct,
  UserProfile,
} from "./pages";
import { checkoutAction, searchAction } from "./actions/index";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
        loader: shopCategoryLoader,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
      },
      {
        path: "search",
        action: searchAction,
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        loader: orderHistoryLoader,
      },
      {
        path: "order-history/:id",
        element: <SingleOrderHistory />,
        loader: singleOrderLoader
      },
    ],
  },
  // Admin routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagement from "./pages/AdminManagement";
import refresh from "@/lib/refresh";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@/api/context/ThemeContext";
import ExternalLayout from "./components/ExternalLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import UserProducts from "./pages/UserProducts";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
  refresh: refresh,
});

export default function App() {
  return (
    <AuthProvider store={store}>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ExternalLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route element={<AuthOutlet fallbackPath="/" />}>
                <Route
                  path="/totalUsers"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <AdminManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/totalProducts"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute requiredRole="user">
                      <Products />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/userProducts"
                  element={
                    <PrivateRoute requiredRole="user">
                      <UserProducts />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

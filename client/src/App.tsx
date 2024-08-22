import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Products from "./Products";
import AdminDashboard from "./AdminDashboard";
import AdminManagement from "./AdminManagement";
import refresh from "@/lib/refresh";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@/api/context/ThemeContext";
import ExternalLayout from "./components/ExternalLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


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
                <Route path="/totalProducts" element={<AdminDashboard />} />
                <Route path="/totalUsers" element={<AdminManagement />} />
                <Route path="/products" element={<Products />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

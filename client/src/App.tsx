import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Login from "./Login";
import Products from "./Products";
import AdminDashboard from "./AdminDashboard";
import AdminManagement from "./AdminManagement";
import refresh from "@/lib/refresh";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@/api/context/ThemeContext"
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
            <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route element={<AuthOutlet fallbackPath="/login" />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/adminManagement" element={<AdminManagement />} />
                <Route path="/products" element={<Products />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

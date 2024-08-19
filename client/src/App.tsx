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
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false, // Automatically secure if using HTTPS
  refresh: refresh,
});

export default function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AuthOutlet fallbackPath="/" />}>
            <Route path="/userslist" element={<AdminManagement />} />
            <Route path="/productslist" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

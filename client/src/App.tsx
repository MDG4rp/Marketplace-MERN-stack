import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import AdminDashboard from "./AdminDashboard";
import AdminManagement from "./AdminManagement";
import refresh from "@/lib/refresh";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: false,
    refresh: refresh
  });

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<AuthOutlet fallbackPath="/" />}>
            <Route path="/products" element={<Products />} />
            <Route path="/userslist" element={<AdminManagement />} />
            <Route path="/productslist" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id/products" element={<Products />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

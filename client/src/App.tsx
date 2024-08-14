import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login></Login>} />
          <Route path="register" element={<Register></Register>} />
          <Route path="dashboard" element={<Dashboard></Dashboard>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

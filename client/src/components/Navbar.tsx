import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <div className="flex space-x-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 px-3 py-1 rounded"
                : "hover:bg-blue-700 px-3 py-1 rounded"
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/adminManagement"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 px-3 py-1 rounded"
                : "hover:bg-blue-700 px-3 py-1 rounded"
            }
          >
            Products
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
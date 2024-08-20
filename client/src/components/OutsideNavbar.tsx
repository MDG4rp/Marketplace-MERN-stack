import React from "react";
import { NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import DropdownMenuProfile from "./DropDownMenuProfile";
import { ModeToggle } from "./DarkModeToggle";

type AuthUser = {
  name: string;
  id: string;
  role: string;
};

const Navbar: React.FC = () => {
  const auth = useAuthUser<AuthUser>();

  return (
    <nav className="p-4 shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-bold transition-colors duration-300 text-gray-900 dark:text-white">
            MyApp
          </div>
          <ModeToggle />
        </div>
        <div className="flex space-x-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors duration-200 ${
                isActive
                  ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                  : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/adminManagement"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition-colors duration-200 ${
                isActive
                  ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                  : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
              }`
            }
          >
            Users
          </NavLink>
        </div>
        <div className="flex items-center space-x-2">
          {auth ? (
            <>
              <span className="transition-colors duration-300 text-gray-900 dark:text-gray-200">
                {auth.name}
              </span>
              <DropdownMenuProfile />
            </>
          ) : (
            <span className="transition-colors duration-300 text-gray-900 dark:text-gray-200">
              Loading...
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
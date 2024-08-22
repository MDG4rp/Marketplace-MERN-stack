import { NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import DropdownMenuProfile from "./DropDownMenuProfile";

type AuthUser = {
  name: string;
  id: string;
  role: string;
};

export default function Navbar() {
  const auth = useAuthUser<AuthUser>();

  return (
    <nav className="p-6 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white mr-4">
            MyApp
          </div>
        </div>
        <div className="flex space-x-4">

          {/* Conditional rendering of links based on user role */}
          {auth?.role === "admin" && (
            <>
              <NavLink
                to="/totalUsers"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Users
              </NavLink>
              
            </>
          )}
          {auth?.role === "admin" && (
            <>
              <NavLink
                to="/totalProducts"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Products
              </NavLink>
              
            </>
          )}

          {auth?.role === "user" && (
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded text-xl ${
                  isActive
                    ? "bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
            >
              Products
            </NavLink>
          )}
        </div>
        <div className="flex items-center space-x-2 text-xl">
          {auth ? (
            <>
              <span className="text-gray-900 dark:text-gray-200">
                {auth.name}
              </span>
              <DropdownMenuProfile />
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">
              Loading...
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
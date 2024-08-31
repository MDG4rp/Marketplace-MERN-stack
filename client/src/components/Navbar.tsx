import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import DropdownMenuProfile from "./DropDownMenuProfile";
import icon from "../assets/icon.svg";
import { ModeToggle } from "./DarkModeToggle";
import { User, LogOut, Users, Package, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

type AuthUser = {
  name: string;
  id: string;
  role: string;
};

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuthUser<AuthUser>();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative p-4">
      <div className="mx-auto flex justify-between items-center">
        <Link to={"/"} onClick={signOut}>
          <div className="flex items-center space-x-2 text-2xl text-neutral-700 dark:text-white">
            <img src={icon} width={50} height={50} alt="logo" />
            <h1>Marketplace</h1>
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="text-2xl text-neutral-700 dark:text-white md:hidden"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 mr-[1.5rem]">
          {auth?.role === "admin" && (
            <>
              <NavLink
                to="/totalUsers"
                className={({ isActive }) =>
                  `flex items-center transition-transform duration-300 ease-in-out hover:scale-105 space-x-2 px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                  }`
                }
              >
                <Users className="w-6 h-6" />
                <span>Users</span>
              </NavLink>
              <NavLink
                to="/totalProducts"
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                  }`
                }
              >
                <Package className="w-6 h-6" />
                <span>Products</span>
              </NavLink>
            </>
          )}
          {auth?.role === "user" && (
            <>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                  }`
                }
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Shop</span>
              </NavLink>
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                  }`
                }
              >
                <Package className="w-6 h-6" />
                <span>Inventory</span>
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xl">
          {auth ? (
            <>
              <Link
                to={"/MyProfile"}
                className="flex items-center space-x-2 text-gray-900 dark:text-gray-200 hover:text-green-500 dark:hover:text-emerald-600 transition-colors duration-300 text-xl"
              >
                
                <span className=" underline">Your Account</span>
              </Link>
              <DropdownMenuProfile />
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">Loading...</span>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-green-100 dark:bg-emerald-950 flex flex-col items-start justify-start space-y-4 p-6 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-2xl text-neutral-700 dark:text-white"
          aria-label="Close menu"
        >
          &times;
        </button>
        {auth?.role === "admin" && (
          <>
            <NavLink
              to="/totalUsers"
              className={({ isActive }) =>
                `flex items-center transition-transform duration-300 ease-in-out hover:scale-105 space-x-2 text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              <Users className="w-6 h-6" />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/totalProducts"
              className={({ isActive }) =>
                `flex items-center transition-transform duration-300 ease-in-out hover:scale-105 space-x-2 text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              <Package className="w-6 h-6" />
              <span>Products</span>
            </NavLink>
          </>
        )}
        {auth?.role === "user" && (
          <>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `flex items-center transition-transform duration-300 ease-in-out hover:scale-105 space-x-2 text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Shop</span>
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `flex items-center transition-transform duration-300 ease-in-out hover:scale-105 space-x-2 text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              <Package className="w-6 h-6" />
              <span>Inventory</span>
            </NavLink>
          </>
        )}
        <div className="text-xl space-y-2">
          {auth ? (
            <>
              <NavLink
                to={"/MyProfile"}
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 text-xl px-4 py-2 rounded-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200  hover:text-gray-900  dark:hover:text-gray-100"
                  }`
                }
                onClick={toggleMenu}
              >
                <User className="w-6 h-6" />
                <span>Your Profile</span>
              </NavLink>
              <Button
                className="flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105 text-xl px-4 py-2 rounded-xl mt-4 bg-transparent dark:bg-transparent dark:text-white text-gray-600 hover:bg-red-600  dark:hover:bg-red-800"
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">Loading...</span>
          )}
        </div>
        <span className="ml-4">
          <ModeToggle />
        </span>
      </div>
    </nav>
  );
}

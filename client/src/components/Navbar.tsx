import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import DropdownMenuProfile from "./DropDownMenuProfile";
import icon from "../assets/icon.svg";
import { ModeToggle } from "./DarkModeToggle";

type AuthUser = {
  name: string;
  id: string;
  role: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuthUser<AuthUser>();
  const signOut = useSignOut();

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
        <div className="hidden md:flex space-x-4 mr-[5rem]">
          {auth?.role === "admin" && (
            <>
              <NavLink
                to="/totalUsers"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/totalProducts"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Products
              </NavLink>
            </>
          )}
          {auth?.role === "user" && (
            <>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/userProducts"
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-xl ${
                    isActive
                      ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }`
                }
              >
                Your Products
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xl">
          {auth ? (
            <>
              <span className="text-gray-900 dark:text-gray-200">
                {auth.name}
              </span>
              <DropdownMenuProfile />
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">Loading...</span>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-green-100 dark:bg-emerald-950 flex flex-col items-center justify-center space-y-4 p-6 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
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
                `text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              Users
            </NavLink>
            <NavLink
              to="/totalProducts"
              className={({ isActive }) =>
                `text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              Products
            </NavLink>
          </>
        )}
        {auth?.role === "user" && (
          <>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              Products
            </NavLink>
            <NavLink
              to="/userProducts"
              className={({ isActive }) =>
                `text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              Your Products
            </NavLink>
          </>
        )}
        <div className="text-xl">
          {auth ? (
            <NavLink
              to={"/MyProfile"}
              className={({ isActive }) =>
                `text-xl px-4 py-2 rounded-xl ${
                  isActive
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                }`
              }
              onClick={toggleMenu}
            >
              Your Profile
            </NavLink>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">Loading...</span>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}

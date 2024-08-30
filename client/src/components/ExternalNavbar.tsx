import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";
import { Home, LogIn, UserPlus } from "lucide-react";

export default function ExternalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between p-4">
      <div className="flex items-center space-x-4 hidden md:flex">
        <Link to={"/"}>
          <img src="/src/assets/icon.svg" alt="logo" width="50px" />
        </Link>
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl text-neutral-700 dark:text-white"
        >
          <span>Marketplace</span>
        </Link>
      </div>
      <div className="flex items-center w-full md:hidden">
        <Link to={"/"} className="mr-auto flex items-center space-x-2">
          <img src="/src/assets/icon.svg" alt="logo" width="50px" />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-2xl text-neutral-700 dark:text-white"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-green-100 dark:bg-emerald-950 flex flex-col items-left justify-start space-y-4 p-6 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
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
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center space-x-2 text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          <LogIn className="w-6 h-6" />
          <span>Login</span>
        </Link>
        <Link
          to="/signup"
          className="flex items-center space-x-2 text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          <UserPlus className="w-6 h-6" />
          <span>Register</span>
        </Link>
        <ModeToggle />
      </div>
      <div className="absolute right-4 top-7 hidden md:flex">
        <ModeToggle />
      </div>
    </div>
  );
}

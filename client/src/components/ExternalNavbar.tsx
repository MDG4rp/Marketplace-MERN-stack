import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";

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
        <Link to="/" className="text-2xl text-neutral-700 dark:text-white">
          Marketplace
        </Link>
      </div>
      <div className="flex items-center w-full md:hidden">
        <Link to={"/"} className="mr-auto">
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
        <Link
          to="/"
          className="text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-xl text-neutral-700 dark:text-white transition-transform duration-300 ease-in-out hover:scale-105"
          onClick={toggleMenu}
        >
          Register
        </Link>
        <ModeToggle />
      </div>
      <div className="absolute right-4 top-7 hidden md:flex">
        <ModeToggle />
      </div>
    </div>
  );
}

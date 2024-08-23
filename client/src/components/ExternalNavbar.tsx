import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";

export default function ExternalNavbar(): ReactElement {
  return (
    <nav className="p-4 shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `p-4 text-xl font-medium rounded-xl ${
              isActive
                ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
                : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 "
            }`
          }
        >
          Login
        </NavLink>

        <Link
          to={"/"}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          MyApp
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}

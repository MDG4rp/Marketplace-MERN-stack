import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";

export default function ExternalNavbar(): ReactElement {
  return (
      <div className="flex items-center justify-between p-4">
        <Link
          to={"/"}
          className="text-3xl text-gray-600 dark:text-white"
        >
          MyApp
        </Link>
        <ModeToggle />
      </div>
  );
}

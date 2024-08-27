import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./DarkModeToggle";

export default function ExternalNavbar(): ReactElement {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <img src="/src/assets/icon.svg" alt="logo" width={"50px"} />
        <Link to={"/"} className="text-2xl text-neutral-700 dark:text-white">
          Marketplace
        </Link>
      </div>
      <ModeToggle />
    </div>
  );
}

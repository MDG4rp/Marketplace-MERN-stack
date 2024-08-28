import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 bg-navbarLight dark:bg-navbarDark">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
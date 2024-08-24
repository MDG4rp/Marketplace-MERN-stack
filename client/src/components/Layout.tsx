import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { GlobalFooter } from "./Footer";

export default function Layout() {
  return (
    <div className="text-zinc-600 dark:text-gray-200 flex flex-col h-screen">
      <span className="sticky top-0 z-50 bg-navbarLight dark:bg-navbarDark">
        <Navbar/>
      </span>
      <main className="flex-grow z-0">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}

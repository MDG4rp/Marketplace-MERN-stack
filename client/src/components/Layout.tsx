import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { GlobalFooter } from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <main className="flex-grow transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}

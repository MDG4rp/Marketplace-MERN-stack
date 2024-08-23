import { Outlet } from "react-router-dom";
import ExternalNavbar from "./ExternalNavbar";
import { GlobalFooter } from "./Footer";
export default function ExternalLayout() {
  return (
    <div className="flex flex-col h-screen transition-colors duration-300">
      <span className=" dark:bg-zinc-800 sticky z-100 top-0">
        <ExternalNavbar />
      </span>
      <main className="flex-grow transition-colors duration-300 bg-gray-200 dark:bg-gray-900">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}

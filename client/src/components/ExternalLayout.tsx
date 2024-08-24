import ExternalNavbar from "./ExternalNavbar";
import { GlobalFooter } from "./Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="text-zinc-600 dark:text-gray-200 flex flex-col h-screen">
      <span className="sticky p-2 top-0 z-50 bg-navbarLight dark:bg-navbarDark">
        <ExternalNavbar/>
      </span>
      <main className="flex-grow">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
};

export default App;
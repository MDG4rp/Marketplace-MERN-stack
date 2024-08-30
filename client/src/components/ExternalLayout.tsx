import ExternalNavbar from "./ExternalNavbar";
import { GlobalFooter } from "./Footer";
import { Outlet } from "react-router-dom";
import { Separator } from "./ui/separator";

const App = () => {
  return (
    <div className="text-zinc-600 dark:text-gray-200 flex flex-col h-screen">
      <span className="sticky top-0 z-50 bg-navbarLight dark:bg-navbarDark">
        <ExternalNavbar />
      </span>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Separator className="bg-neutral-300 w-[85%] self-center dark:bg-neutral-600" />
      <GlobalFooter />
    </div>
  );
};

export default App;

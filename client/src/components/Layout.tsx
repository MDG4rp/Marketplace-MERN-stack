import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col  h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <main className=" flex-grow transition-colors duration-300 bg-grey-100 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
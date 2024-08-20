import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC<{ position: "left" | "right" }> = ({ position }) => {
  const isLeft = position === "left";
  return (
    <aside
      className={`bg-gray-200 p-4 ${
        isLeft ? "w-1/4" : "w-1/4"
      } h-full border-r border-gray-300`}
    >
      <div className="space-y-2">
        <NavLink
          to="/section1"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-1 rounded bg-gray-300"
              : "block px-3 py-1 rounded hover:bg-gray-300"
          }
        >
          Section 1
        </NavLink>
        <NavLink
          to="/section2"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-1 rounded bg-gray-300"
              : "block px-3 py-1 rounded hover:bg-gray-300"
          }
        >
          Section 2
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
import { NavLink, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import clsx from "clsx";
import { useContext } from "react";

function SidebarLink({ link }) {
  const location = useLocation();
  const active = location.pathname === link.path;

  const { isOpen } = useContext(SidebarContext);

  return (
    <NavLink
      to={link.path}
      className={`flex items-center gap-2 py-3 px-4 hover:text-white transition-colors font-medium ${
        active ? "text-white bg-dark-300" : "text-dark-100"
      }`}
    >
      <span
        style={{ transition: "margin .2s ease" }}
        className={clsx(
          active && "text-primary",
          isOpen ? "ml-0" : "ml-3 xl:ml-0"
        )}
      >
        {link.icon}
      </span>

      <span
        className={clsx(
          "transition-opacity whitespace-nowrap",
          isOpen ? "md:opacity-100" : "md:opacity-0 xl:opacity-100"
        )}
      >
        {link.title}
      </span>
    </NavLink>
  );
}

export default SidebarLink;

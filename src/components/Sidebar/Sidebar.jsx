import { AnimatePresence, motion } from "framer-motion";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import logo from "../../assets/images/ZKLiquidIcon.svg";
import sidebarLinks from "../../constant/sidebarLinks";

import logoText from "../../assets/images/logotext.svg";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

import SidebarDropdown from "./SidebarDropdown";
import SidebarLink from "./Sidebarlink";
import clsx from "clsx";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
  closed: {
    x: -304,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
};

function Sidebar({ currentPageLinks }) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  return (
    <>
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`bg-[#04131F] w-64 h-app fixed z-30 left-0 top-0 md:!translate-x-0 md:transition-all xl:w-64 ${
          isOpen ? "md:w-64" : "md:w-20"
        }`}
      >
        <button
          className="absolute top-0 -right-12 p-3 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        <div className="w-full h-full overflow-y-auto overflow-x-clip border-r border-dark-300">
          <Link
            to="/"
            className="py-5 px-4 flex gap-1 w-full border-b border-dark-300 items-center"
          >
            <img
              className={clsx(
                "transition-all h-[28px] w-auto",
                isOpen ? "ml-0" : "ml-3 xl:ml-0"
              )}
              src={logo}
              alt=""
            />
            <img
              className={`transition-opacity h-[26px] w-auto ${
                isOpen ? "md:opacity-100" : "md:opacity-0 xl:opacity-100"
              }`}
              src={logoText}
              alt=""
            />
          </Link>

          <div className="space-y-2.5 mt-3">
            {/* {currentPageLinks?.links.map((link) =>
              link.hasOwnProperty("children") ? (
                <SidebarDropdown link={link} key={link.title} />
              ) : (
                <SidebarLink link={link} key={link.title} />
              )
            )} */}

            {sidebarLinks.map((link) =>
              link.hasOwnProperty("children") ? (
                <SidebarDropdown link={link} key={link.title} />
              ) : (
                <SidebarLink link={link} key={link.title} />
              )
            )}
          </div>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/70 fixed inset-0 z-20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;

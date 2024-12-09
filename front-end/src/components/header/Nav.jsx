import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuFileSignature } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
const Nav = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className=" top-full left-0 bg-zinc-50/10 block transition-all duration-200  z-30 text-sm py-2">
      <ul className="flex lg:gap-4 gap-2 flex-row p-2 lg:p-0  divide-gray-200 lg:divide-y-0 items-center">
        {user && (
          <Link
            to={"/posts/create"}
            className="font-semibold text-zinc-600  hover:text-zinc-800 capitalize flex gap-2 items-center duration-200  "
          >
            <LuFileSignature size={18} />
            Write{" "}
          </Link>
        )}
        {user?.isAdmin && (
          <Link
            to={"/admin-dashboard"}
            className="font-semibold text-zinc-600 flex  items-center gap-2 hover:text-zinc-800 capitalize transition-all   "
          >
            <MdOutlineDashboard size={18} />
            Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

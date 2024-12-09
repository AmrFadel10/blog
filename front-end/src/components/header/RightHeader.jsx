import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutAuthApiCall } from "../../pages/redux/apicalls/AuthApiCall";
import { CiLogout } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
const RightHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  // const { profile } = useSelector((state) => state.profile);

  return (
    <div className="">
      {user ? (
        <>
          <div className="flex relative items-center gap-2">
            <span
              className="text-sm font-bold text-zinc-800 capitalize cursor-pointer hover:text-zinc-950"
              onClick={() => setDropdown((pre) => !pre)}
            >
              {user.username}
            </span>
            <img
              src={user.profilePhoto?.url}
              alt=""
              className="w-8 h-8 rounded-full cursor-pointer hover:opacity-85"
              onClick={() => setDropdown((pre) => !pre)}
            />
            {dropdown && (
              <div className="border shadow overflow-hidden absolute top-[calc(100%+10px)] right-10 bg-white rounded-xl divide-y w-36 ">
                <Link
                  to={`/profile/${user?._id}`}
                  className="flex items-center hover:text-zinc-950 gap-2 hover:bg-zinc-50 py-2 px-2"
                  onClick={() => setDropdown(false)}
                >
                  <LuUser size={18} /> Profile
                </Link>
                <div
                  className="flex items-center hover:text-zinc-950 gap-2 hover:bg-zinc-50  py-2 px-2 cursor-pointer"
                  onClick={() => {
                    setDropdown(false);
                    dispatch(logoutAuthApiCall());
                  }}
                >
                  <CiLogout size={18} />
                  Signout
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            to={"/login"}
            className="bg-zinc-700 px-5 lg:py-2 py-[2px] mr-2 font-bold text-zinc-100 hover:bg-zinc-950 lg:text-sm xl:text-base text-xs rounded-full"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="text-zinc-700 px-5 lg:py-2 py-[2px]  font-bold bg-zinc-200 hover:bg-zinc-300 lg:text-sm xl:text-base text-xs  rounded-full"
          >
            Signup
          </Link>
        </>
      )}
    </div>
  );
};

export default RightHeader;

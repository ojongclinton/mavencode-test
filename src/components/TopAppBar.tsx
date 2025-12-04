import InitialsAvatar from "./InitialsAvatar";
import UserNotifications from "./Notifications";
import { FaTerminal } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { classNames } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function TopAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout())
    navigate("/login");
  };

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-[5px] bg-[#4B87ED] rounded-lg">
              <FaTerminal size={18} className="text-white " />
            </div>
            <p className="text-xl font-[500] text-gray-600">tabler</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <button className="text-xs border border-[#4B87ED] py-1 px-2 rounded-sm text-[#4B87ED] cursor-pointer hover:text-white hover:bg-[#4B87ED] transition-colors duration-300">
              Source code
            </button>
          </div>
          <div>
            <UserNotifications />
          </div>

          <Menu as="div" className="relative">
            <Menu.Button className="p-1 rounded-full hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B87ED]">
              <div className="flex gap-3 items-center">
                <InitialsAvatar avatarUrl={user?.avatar} />

                <div className="hidden sm:block text-left">
                  <p className="text-gray-600 text-sm font-medium">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className={classNames("py-1")}>
                  <div className="block sm:hidden px-4 py-2 border-b border-gray-100">
                    <p className="text-gray-700 text-sm font-semibold truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex w-full px-4 py-2 text-sm items-center hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                        )}
                      >
                        <FiLogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                        Log Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopAppBar;

import InitialsAvatar from "./InitialsAvatar";
import UserNotifications from "./Notifications";
import { FaTerminal } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";

function TopAppBar() {
  const user = useAppSelector((state) => state.auth.user);
  

  return (
    <div className="bg-white">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
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
              {" "}
              Source code
            </button>
          </div>
          <div>
            <UserNotifications />
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <InitialsAvatar avatarUrl={user?.avatar} />
              <div>
                <p className="text-gray-600 text-sm">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TopAppBar;


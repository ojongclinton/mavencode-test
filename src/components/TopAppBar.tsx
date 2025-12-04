import { useState } from "react";
import InitialsAvatar from "./InitialsAvatar";
import UserNotifications from "./Notifications";
import { FaTerminal } from "react-icons/fa";
import { classNames } from "../helpers";
import {
  FiBox,
  FiCalendar,
  FiCheckSquare,
  FiHome,
  FiImage,
} from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useAppSelector } from "../app/hooks";

const dashBoardTabs = [
  {
    title: "Home",
    icon: FiHome,
  },
  {
    title: "Interface",
    icon: FiBox,
  },
  {
    title: "Components",
    icon: FiCalendar,
  },
  {
    title: "Pages",
    icon: HiOutlineDocument,
  },
  {
    title: "Forms",
    icon: FiCheckSquare,
  },
  {
    title: "Gallery",
    icon: FiImage,
  },
  {
    title: "Documentation",
    icon: IoDocumentTextOutline,
  },
];

function TopAppBar() {
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(dashBoardTabs[0]);

  return (
    <div className="bg-white ">
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
      <div className="px-4 flex justify-between items-center border-b border-gray-200">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default TopAppBar;

const DashboardTabs = ({
  setActiveTab,
  activeTab,
}: {
  activeTab: { title: string; icon: any };
  setActiveTab: (v: { title: string; icon: any }) => void;
}) => {
  return (
    <div className="flex gap-6">
      {dashBoardTabs.map((t) => {
        let isActive = activeTab.title === t.title;
        return (
          <p
            onClick={() => {
              setActiveTab(t);
            }}
            className={classNames(
              isActive
                ? "border-b border-[#4B87ED] text-[#4B87ED]"
                : " text-gray-400 hover:text-[#4B87ED] transition-colors duration-300",
              "py-4 text-sm flex items-center gap-[2px] cursor-pointer"
            )}
          >
            <t.icon /> {t.title}
          </p>
        );
      })}
    </div>
  );
};
